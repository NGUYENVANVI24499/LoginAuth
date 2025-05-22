const kafka = require('../../config/kafka.config');
const logger = require('../../common/utils/logger');

class NotificationConsumer {
  constructor() {
    this.consumer = kafka.consumer({ groupId: 'notification-group' });
  }

  async run() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'user-events', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        logger.info(`Received event: ${event.event}`, event.data);

        switch (event.event) {
          case 'USER_CREATED':
            logger.info(`User created: ${event.data.username}`);
            // Implement notification logic (e.g., send email)
            break;
          case 'USER_UPDATED':
            logger.info(`User updated: ${event.data.username}`);
            // Implement notification logic
            break;
          case 'USER_DELETED':
            logger.info(`User deleted: ${event.data.id}`);
            // Implement notification logic
            break;
          default:
            logger.warn(`Unknown event: ${event.event}`);
        }
      },
    });
  }
}

const consumer = new NotificationConsumer();
consumer.run().catch((err) => logger.error('Consumer error:', err));