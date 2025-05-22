const UserRepository = require('../repositories/user.repository');
const { hashPassword } = require('../../../common/utils/hash');
const Cache = require('../../../common/utils/cache');
const KafkaProducer = require('../../../common/utils/kafka');

class UserService {
  async createUser(userData) {
    userData.password = await hashPassword(userData.password);
    const user = await UserRepository.create(userData);
    await Cache.del('users:all');
    await KafkaProducer.send('user-events', {
      event: 'USER_CREATED',
      data: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
    return user;
  }

  async getUserById(id) {
    const cacheKey = `user:${id}`;
    let user = await Cache.get(cacheKey);
    if (!user) {
      user = await UserRepository.findById(id);
      if (!user) throw new Error('User not found');
      await Cache.set(cacheKey, user);
    }
    return user;
  }

  async getUserByEmail(email) {
    const cacheKey = `user:email:${email}`;
    let user = await Cache.get(cacheKey);
    if (!user) {
      user = await UserRepository.findByEmail(email);
      if (!user) throw new Error('User not found');
      await Cache.set(cacheKey, user);
    }
    return user;
  }

  async getAllUsers({ page = 1, pageSize = 10 }) {
    const cacheKey = `users:all:${page}:${pageSize}`;
    let result = await Cache.get(cacheKey);
    if (!result) {
      const offset = (page - 1) * pageSize;
      const { rows, count } = await UserRepository.findAll({ limit: pageSize, offset });
      result = {
        users: rows,
        total: count,
        page,
        pageSize,
        totalPages: Math.ceil(count / pageSize),
      };
      await Cache.set(cacheKey, result);
    }
    return result;
  }

  async updateUser(id, userData) {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    const updatedUser = await UserRepository.update(id, userData);
    if (!updatedUser) throw new Error('User not found');
    await Cache.del(`user:${id}`);
    await Cache.del(`user:email:${updatedUser.email}`);
    await Cache.del('users:all');
    await KafkaProducer.send('user-events', {
      event: 'USER_UPDATED',
      data: { id: updatedUser.id, username: updatedUser.username, email: updatedUser.email, role: updatedUser.role },
    });
    return updatedUser;
  }

  async deleteUser(id) {
    const deletedUser = await UserRepository.delete(id);
    if (!deletedUser) throw new Error('User not found');
    await Cache.del(`user:${id}`);
    await Cache.del(`user:email:${deletedUser.email}`);
    await Cache.del('users:all');
    await KafkaProducer.send('user-events', {
      event: 'USER_DELETED',
      data: { id },
    });
    return deletedUser;
  }
}

module.exports = new UserService();