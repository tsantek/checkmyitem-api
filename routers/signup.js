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
        body('country')
            .trim()
            .isLength({ min: 2 })
            .isString()
            .withMessage('Username is not valid'),
    ], validateRequest,
    (req, res) => {
        const { email, password, username, country, organization, repairShop } = req.body
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
                            password,
                            country,
                            organization,
                            repairShop
                        }])
                        .then((newUserId) => {
                            const userID = newUserId[0];
                            const accessToken = jwt.sign({
                                id: newUserId,
                                email,
                                username,
                            }, process.env.JWT_TOKEN)

                            // Store token in cookie
                            res.cookie('token', accessToken, { maxAge: 10 * 1000 })

                            res.status(201).send({
                                userID,
                                email,
                                username,
                                country,
                                organization,
                                repairShop
                            });
                        });
                }
                res.send([{ message: 'User exists' }])
            }).catch(err => {
                console.log(err)
                res.send([{ message: 'Something when wrong!' }])
            })
    })


module.exports = signupRouter