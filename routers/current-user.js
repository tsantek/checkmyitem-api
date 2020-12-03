const express = require('express')
const currentUserRouter = express.Router()

currentUserRouter.get('/api/users/currentuser', function (req, res) {
    res.send('hello world current user')
})

module.exports = currentUserRouter