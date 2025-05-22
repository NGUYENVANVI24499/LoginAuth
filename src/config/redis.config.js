const { createClient } = require('redis');
require('dotenv').config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.connect();

module.exports = redisClient;