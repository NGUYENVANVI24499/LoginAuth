const Role = require('../models/role.model');

class RoleRepository {
  async findById(id) {
    return Role.findByPk(id);
  }

  async findByName(name) {
    return Role.findOne({ where: { name } });
  }

  async findAll() {
    return Role.findAll();
  }

  async create(roleData) {
    return Role.create(roleData);
  }
}

module.exports = new RoleRepository();