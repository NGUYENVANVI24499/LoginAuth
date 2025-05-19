class IUserService {
  async createUser(userData) {}
  async getUserById(id) {}
  async getUserByEmail(email) {}
  async getAllUsers({ page, pageSize }) {}
  async updateUser(id, userData) {}
  async deleteUser(id) {}
}

module.exports = IUserService;