const jwt = require('jsonwebtoken');
const User = require('../../user/models/user.model');
const { TokenBlacklist } = require('../../../config/database.config');
const { comparePassword } = require('../../../common/utils/hash');
const jwtConfig = require('../../../config/jwt.config');

class AuthService {
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      jwtConfig.refreshSecret,
      { expiresIn: jwtConfig.refreshExpiresIn }
    );

    return { accessToken, refreshToken, user };
  }

  async logout(token) {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      throw new Error('Invalid token');
    }

    await TokenBlacklist.create({
      token,
      expiresAt: new Date(decoded.exp * 1000),
    });
  }

  async refreshToken(refreshToken) {
    const blacklisted = await TokenBlacklist.findOne({ where: { token: refreshToken } });
    if (blacklisted) {
      throw new Error('Token is blacklisted');
    }

    try {
      const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        throw new Error('User not found');
      }

      const accessToken = jwt.sign(
        { id: user.id, role: user.role },
        jwtConfig.secret,
        { expiresIn: jwtConfig.expiresIn }
      );

      const newRefreshToken = jwt.sign(
        { id: user.id },
        jwtConfig.refreshSecret,
        { expiresIn: jwtConfig.refreshExpiresIn }
      );

      return { accessToken, newRefreshToken };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}

module.exports = new AuthService();