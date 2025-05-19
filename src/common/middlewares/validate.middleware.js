const validate = (schema, options = {}) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, options);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

module.exports = validate;