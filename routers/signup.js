const express = require('express')
const signupRouter = express.Router()
const knex = require('../db/knex.js')

const { body } = require('express-validator')
const jwt = require('jsonwebtoken')

const validateRequest = require('./../middlewares/validate-request.js')

signupRouter.post('/api/users/signup',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 character'),
        body('username')
            .trim()
            .isLength({ min: 2 })
            .isString()
            .withMessage('Username is not valid'),
    ], validateRequest,
    (req, res) => {
        const { email, password, username } = req.body
        knex.select("*")
            .from("users")
            .where("email", email)
            .then(userNameList => {
                if (userNameList.length === 0) {
                    return knex('users')
                        .returning('id')
                        .insert([{
                            username,
                            email,
                            password
                        }])
                        .then((newUserId) => {
                            console.log('inserted user', newUserId);
                            res.sendStatus(200)
                        });
                }
                res.send("already there")
            }).catch(err => {
                res.sendStatus(500)
            })
    })


module.exports = signupRouter