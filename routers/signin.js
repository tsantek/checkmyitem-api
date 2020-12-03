const express = require('express')
const signinRouter = express.Router()

signinRouter.get('/api/users/signin', function (req, res) {
    res.send('hello world signin')
})

module.exports = signinRouter