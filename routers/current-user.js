const express = require('express')
const currentUserRouter = express.Router()



const currentUser = require('../middlewares/current-user.js')

currentUserRouter.get('/api/users/currentuser', currentUser,
    function (req, res) {
        if (req.currentUser) {
            res.send(req.currentUser);
        } else {
            res.send(null);
        }
    })

module.exports = currentUserRouter