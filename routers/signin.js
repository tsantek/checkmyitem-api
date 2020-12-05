const express = require('express')
const signinRouter = express.Router()
const jwt = require('jsonwebtoken')
const { body } = require('express-validator')

const knex = require('../db/knex.js')
const validateRequest = require('../middlewares/validate-request')

signinRouter.post('/api/users/signin', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must enter the password!'),
], validateRequest,
    (req, res) => {
        const { email, password } = req.body;

        // hash password
        knex.select("*")
            .from("users")
            .where("email", email)
            .where("password", password)
            .then(users => {
                if (!users.length) {
                    res.send([{ message: 'Wrong credentials!' }])
                } else {
                    if (users.length === 1) {
                        const user = users[0];
                        const accessToken = jwt.sign({
                            id: user.id,
                            email: user.email,
                            username: user.email,
                        }, process.env.JWT_TOKEN)

                        // Store token in cookie
                        res.cookie('token', accessToken, { maxAge: 10 * 1000 })

                        const returnUser = {
                            userID: user.id,
                            email: user.email,
                            username: user.username,
                            country: user.country,
                            organization: user.organization,
                            repairShop: user.repairShop
                        }
                        res.status(200).send(returnUser);
                    } else {
                        res.send([{ message: 'Something went wrong!' }])
                    }
                }
            })
            .catch(err => {
                res.send([{ message: 'Something went wrong!' }])
            })
    }
)
module.exports = signinRouter