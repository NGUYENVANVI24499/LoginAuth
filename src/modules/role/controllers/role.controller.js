const RoleService = require('../services/role.service');

class RoleController {
  async createRole(req, res, next) {
    try {
      const role = await RoleService.createRole(req.body);
      res.status(201).json(role);
    } catch (error) {
      next(error);
    }
  }

  async getRole(req, res, next) {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      res.json(role);
    } catch (error) {
      next(error);
    }
  }

  async getAllRoles(req, res, next) {
    try {
      const roles = await RoleService.getAllRoles();
      res.json(roles);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoleController();