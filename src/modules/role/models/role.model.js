const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/database.config').sequelize;

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.ENUM('admin', 'manager', 'user'),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});

module.exports = Role;