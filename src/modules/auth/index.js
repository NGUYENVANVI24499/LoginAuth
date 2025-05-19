const AuthController = require('./controllers/auth.controller');
const AuthService = require('./services/auth.service');
const loginDto = require('./dtos/login.dto');
const authMiddleware = require('./middlewares/auth.middleware');
const { loginValidator } = require('./validators/auth.validator');

module.exports = {
  AuthController,
  AuthService,
  loginDto,
  authMiddleware,
  loginValidator,
};