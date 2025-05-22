const app = require('./app');
const { sequelize } = require('./config/database.config');
const KafkaProducer = require('./common/utils/kafka');
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync();
    await KafkaProducer.connect();
    console.log('Kafka producer connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Unable to start server:', err);
  }
}

startServer();