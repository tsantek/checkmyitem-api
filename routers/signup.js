const express = require('express')
const signupRouter = express.Router()
const knex = require('../db/knex.js')

const { body } = require('express-validator')

const Cookies = require('cookies')
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
                if (!userNameList.length) {
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
                                id: userID,
                                email,
                                username,
                            }, process.env.JWT_TOKEN)

                            // Store token in cookie
                            // Token in cookie
                            new Cookies(req, res).set('accessToken', accessToken, {
                                // Front-end JS can't read token
                                // httpOnly: true,
                                // Ability to replace cookie (logging out)
                                overwrite: true,
                                // maxAge: timeout
                            })
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