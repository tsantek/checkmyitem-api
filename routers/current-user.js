const express = require('express')
const currentUserRouter = express.Router()



const currentUser = require('../middlewares/current-user.js')

currentUserRouter.get('/api/users/currentuser', currentUser,
    function (req, res) {
        res.send(req.currentUser || null);
    })

module.exports = currentUserRouter