const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'restful-api',
  brokers: [process.env.KAFKA_BROKERS],
});

module.exports = kafka;