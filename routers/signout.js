const express = require('express')
const signoutRouter = express.Router()
const Cookies = require('cookies')

signoutRouter.post('/api/users/signout', function (req, res) {
    new Cookies(req, res).set('accessToken', null, {
        httpOnly: true,
        maxAge: 0
    })

    res.send([{}])
})

module.exports = signoutRouter