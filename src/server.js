const app = require('./app');
const { sequelize } = require('./config/database.config');
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });