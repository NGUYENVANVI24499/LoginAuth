const express = require('express');
const router = express.Router();
const RoleController = require('../../modules/role/controllers/role.controller');
const authMiddleware = require('../../modules/auth/middlewares/auth.middleware');
const rolesMiddleware = require('../../common/middlewares/roles.middleware');
const ROLES = require('../../common/constants/roles.enum');

router.post('/', authMiddleware, rolesMiddleware(ROLES.ADMIN), RoleController.createRole);
router.get('/:id', authMiddleware, RoleController.getRole);
router.get('/', authMiddleware, RoleController.getAllRoles);

module.exports = router;