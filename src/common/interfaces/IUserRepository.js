class IUserRepository {
  async findById(id) {}
  async findByEmail(email) {}
  async findAll({ limit, offset }) {}
  async create(userData) {}
  async update(id, userData) {}
  async delete(id) {}
}

module.exports = IUserRepository;