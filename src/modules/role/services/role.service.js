const RoleRepository = require('../repositories/role.repository');

class RoleService {
  async createRole(roleData) {
    const existingRole = await RoleRepository.findByName(roleData.name);
    if (existingRole) {
      throw new Error('Role already exists');
    }
    return RoleRepository.create(roleData);
  }

  async getRoleById(id) {
    const role = await RoleRepository.findById(id);
    if (!role) throw new Error('Role not found');
    return role;
  }

  async getAllRoles() {
    return RoleRepository.findAll();
  }
}

module.exports = new RoleService();