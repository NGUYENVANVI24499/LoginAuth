const AuthService = require('../services/auth.service');
const loginSchema = require('../dtos/login.dto');
const { TokenBlacklist } = require('../../../config/database.config');

class AuthController {
  async login(req, res, next) {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await AuthService.login(email, password);

      res.json({
        accessToken,
        refreshToken,
        user: { id: user.id, username: user.username, email: user.email, role: user.role },
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(400).json({ message: 'No token provided' });
      }

      await AuthService.logout(token);
      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token required' });
      }

      const { accessToken, newRefreshToken } = await AuthService.refreshToken(refreshToken);
      res.json({ accessToken, refreshToken: newRefreshToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();