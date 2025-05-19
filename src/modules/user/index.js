const UserController = require('./controllers/user.controller');
const UserService = require('./services/user.service');
const UserRepository = require('./repositories/user.repository');
const UserModel = require('./models/user.model');
const createUserDto = require('./dtos/create-user.dto');
const { createUserValidator, updateUserValidator } = require('./validators/user.validator');

module.exports = {
  UserController,
  UserService,
  UserRepository,
  UserModel,
  createUserDto,
  createUserValidator,
  updateUserValidator,
};