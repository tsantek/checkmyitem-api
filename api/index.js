const express = require('express');
const router = express.Router();

const auth = require('./auth')
const items = require('./items')

router.use('/users', auth)
router.use('/items', items)

module.exports = router;