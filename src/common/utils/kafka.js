const kafka = require('../../config/kafka.config');
const logger = require('./logger');

class KafkaProducer {
  constructor() {
    this.producer = kafka.producer();
  }

  async connect() {
    await this.producer.connect();
  }

  async send(topic, message) {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
      logger.info(`Message sent to topic ${topic}: ${JSON.stringify(message)}`);
    } catch (error) {
      logger.error(`Failed to send message to topic ${topic}: ${error.message}`);
      throw error;
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}

module.exports = new KafkaProducer();