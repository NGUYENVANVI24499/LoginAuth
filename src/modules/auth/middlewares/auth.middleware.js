const jwt = require('jsonwebtoken');
const { TokenBlacklist } = require('../../../config/database.config');
const jwtConfig = require('../../../config/jwt.config');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const blacklisted = await TokenBlacklist.findOne({ where: { token } });
  if (blacklisted) {
    return res.status(401).json({ message: 'Token is blacklisted' });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;