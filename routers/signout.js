const express = require('express')
const signoutRouter = express.Router()

signoutRouter.get('/api/users/signout', function (req, res) {
    res.send('sigout!')
})

module.exports = signoutRouter