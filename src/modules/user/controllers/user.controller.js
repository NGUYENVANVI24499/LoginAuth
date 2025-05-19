const UserService = require('../services/user.service');
const createUserSchema = require('../dtos/create-user.dto');
const { validate } = require('../../../common/middlewares/validate.middleware');

class UserController {
  async createUser(req, res, next) {
    try {
      const { error } = createUserSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = await UserService.createUser(req.body);
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const { page, pageSize } = req.query;
      const result = await UserService.getAllUsers({ page: parseInt(page), pageSize: parseInt(pageSize) });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { error } = createUserSchema.validate(req.body, { allowUnknown: true });
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const user = await UserService.updateUser(req.params.id, req.body);
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();