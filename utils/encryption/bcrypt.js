const bcrypt = require('bcrypt-nodejs')

const createSalt = (rounds = 12) =>
    new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) =>
            err ? reject(err) : resolve(salt)
        )
    })

const createHash = (plainText, salt) =>
    new Promise((resolve, reject) => {
        bcrypt.hash(plainText, salt, null, (err, hash) =>
            err ? reject(err) : resolve(hash)
        )
    })

const verifyHash = (plainText, hash) =>
    new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hash, (err, valid) =>
            err ? reject(err) : resolve(valid)
        )
    })
