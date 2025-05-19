const User = require('../models/user.model');

class UserRepository {
  async findById(id) {
    return User.findByPk(id);
  }

  async findByEmail(email) {
    return User.findOne({ where: { email } });
  }

  async findAll({ limit, offset }) {
    return User.findAndCountAll({ limit, offset });
  }

  async create(userData) {
    return User.create(userData);
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.destroy();
  }
}

module.exports = new UserRepository();