const Cookies = require('cookies')
const jwt = require('jsonwebtoken')

const BadRequestError = require('../errors/bed-request-error.js')

const knex = require('../db/knex.js')


const login = async (req, res, next) => {
    const { email, password } = req.body;

    // hash password
    await knex.select("*")
        .from("users")
        .where("email", email)
        .where("password", password)
        .then(users => {
            if (!users.length) {
                throw new BadRequestError('Wrong credentials')
            } else {
                if (users.length === 1) {
                    const user = users[0];
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
                } else {
                    throw new BadRequestError('Something went wrong!')
                }
            }
        })
        .catch(next)
}



const signup = async (req, res, next) => {
    const { email, password, username, country, organization, repairShop } = req.body
    await knex.select("*")
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
            throw new BadRequestError('User exists')
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