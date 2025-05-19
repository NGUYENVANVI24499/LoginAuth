const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

const TokenBlacklist = sequelize.define('TokenBlacklist', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'token_blacklist',
  timestamps: false,
});

module.exports = { sequelize, TokenBlacklist };