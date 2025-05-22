const redisClient = require('../../config/redis.config');

class Cache {
  async get(key) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async set(key, value, expirySeconds = 3600) {
    await redisClient.setEx(key, expirySeconds, JSON.stringify(value));
  }

  async del(key) {
    await redisClient.del(key);
  }
}

module.exports = new Cache();