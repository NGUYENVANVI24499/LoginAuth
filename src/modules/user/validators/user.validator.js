const validate = require('../../../common/middlewares/validate.middleware');
const createUserSchema = require('../dtos/create-user.dto');

const createUserValidator = validate(createUserSchema);
const updateUserValidator = validate(createUserSchema, { allowUnknown: true });

module.exports = { createUserValidator, updateUserValidator };