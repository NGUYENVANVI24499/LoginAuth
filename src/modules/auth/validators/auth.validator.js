const validate = require('../../../common/middlewares/validate.middleware');

const loginValidator = (schema) => validate(schema);

module.exports = { loginValidator };