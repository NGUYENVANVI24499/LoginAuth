const express = require('express');
const router = express.Router();

router.use('/auth', require('./v1/auth.routes'));
router.use('/users', require('./v1/user.routes'));
router.use('/roles', require('./v1/role.routes'));

module.exports = router;