const express = require('express');
const router = express.Router();
const AuthController = require('../../modules/auth/controllers/auth.controller');
const { loginValidator } = require('../../modules/auth/validators/auth.validator');
const authMiddleware = require('../../modules/auth/middlewares/auth.middleware');

router.post('/login', loginValidator(require('../../modules/auth/dtos/login.dto')), AuthController.login);
router.post('/logout', authMiddleware, AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);

module.exports = router;