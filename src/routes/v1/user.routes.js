const express = require('express');
const router = express.Router();
const UserController = require('../../modules/user/controllers/user.controller');
const authMiddleware = require('../../modules/auth/middlewares/auth.middleware');
const rolesMiddleware = require('../../common/middlewares/roles.middleware');
const { createUserValidator, updateUserValidator } = require('../../modules/user/validators/user.validator');
const ROLES = require('../../common/constants/roles.enum');

router.post('/', createUserValidator, UserController.createUser);
router.get('/:id', authMiddleware, UserController.getUser);
router.get('/', authMiddleware, UserController.getAllUsers);
router.put('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN, ROLES.MANAGER), updateUserValidator, UserController.updateUser);
router.delete('/:id', authMiddleware, rolesMiddleware(ROLES.ADMIN), UserController.deleteUser);

module.exports = router;