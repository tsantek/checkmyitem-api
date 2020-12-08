const db = require("../models/index.js");
const Users = db.Users;
const Op = db.Sequelize.Op;

const Cookies = require('cookies')
const jwt = require('jsonwebtoken')

const BadRequestError = require('../errors/bed-request-error.js')

// REMOVE
// const knex = require('../db/knex.js')


const login = async (req, res, next) => {
    const { email, password } = req.body
    await Users.findOne({ where: { email: email } }).then(
        (user) => {
            if (!user) {
                throw new BadRequestError('Wrong credentials')
            } else {
                const accessToken = jwt.sign({
                    id: user.id,
                    email: user.email,
                    username: user.email,
                }, process.env.JWT_TOKEN)
                // Token in cookie
                new Cookies(req, res).set('accessToken', accessToken, {
                    // Front-end JS can't read token
                    // httpOnly: true,
                    // Ability to replace cookie (logging out)
                    overwrite: true,
                    // maxAge: timeout
                })

                const returnUser = {
                    userID: user.id,
                    email: user.email,
                    username: user.username,
                    country: user.country,
                    organization: user.organization,
                    repairShop: user.repairShop
                }
                res.status(200).send(returnUser);
            }
        }
    ).catch(next)
}



const signup = async (req, res, next) => {
    const { email, password, username, country, organization, repairShop } = req.body
    await Users.findOne({ where: { email: email } }).then(userNameList => {
        console.log(userNameList)
        if (!userNameList) {
            // Create a Tutorial
            const user = {
                username,
                email,
                password,
                country,
                organization,
                repairShop
            };
            // Save Tutorial in the database
            Users.create(user)
                .then(data => {
                    const id = data.id
                    const accessToken = jwt.sign({
                        id,
                        email,
                        username,
                    }, process.env.JWT_TOKEN)

                    // Token in cookie
                    new Cookies(req, res).set('accessToken', accessToken, {
                        // Front-end JS can't read token
                        // httpOnly: true,
                        // Ability to replace cookie (logging out)
                        overwrite: true,
                        // maxAge: timeout
                    })
                    res.status(201).send({
                        id,
                        email,
                        username,
                        country,
                        organization,
                        repairShop
                    });
                })
        } else {
            throw new BadRequestError('User exists')
        }
    }).catch(next)
}


const signout = (req, res) => {
    new Cookies(req, res).set('accessToken', null, {
        httpOnly: true,
        maxAge: 0
    })

    res.send([{}])
}

const verify = (req, res) => {
    if (req.currentUser) {
        res.send(req.currentUser);
    } else {
        res.send(null);
    }
}

module.exports = {
    login,
    signup,
    signout,
    verify
}