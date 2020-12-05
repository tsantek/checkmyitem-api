const express = require('express')
const signoutRouter = express.Router()

signoutRouter.post('/api/users/signout', function (req, res) {
    req.session = null;

    res.send([{}])
})

module.exports = signoutRouter