const express = require('express');
const router = express.Router();

const auth = require('./auth')

router.use('/users', auth)

module.exports = router;