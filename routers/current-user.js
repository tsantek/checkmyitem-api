const express = require('express')
const currentUserRouter = express.Router()

// const currentUser = require('../middlewares/current-user.js')

currentUserRouter.get('/api/users/currentuser',
    function (req, res) {
        console.log(req.headers.cookie)
        res.send('hello world current user')
        // res.send({ currentUser: req.currentUser || null });
    })

module.exports = currentUserRouter