const UserRepository = require('../repositories/user.repository');
const { hashPassword } = require('../../../common/utils/hash');

class UserService {
  async createUser(userData) {
    userData.password = await hashPassword(userData.password);
    return UserRepository.create(userData);
  }

  async getUserById(id) {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error('User not found');
    return user;
  }

  async getUserByEmail(email) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('User not found');
    return user;
  }

  async getAllUsers({ page = 1, pageSize = 10 }) {
    const offset = (page - 1) * pageSize;
    const { rows, count } = await UserRepository.findAll({ limit: pageSize, offset });
    return {
      users: rows,
      total: count,
      page,
      pageSize,
      totalPages: Math.ceil(count / pageSize),
    };
  }

  async updateUser(id, userData) {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    const updatedUser = await UserRepository.update(id, userData);
    if (!updatedUser) throw new Error('User not found');
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await UserRepository.delete(id);
    if (!deletedUser) throw new Error('User not found');
    return deletedUser;
  }
}

module.exports = new UserService();