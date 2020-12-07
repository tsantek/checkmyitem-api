const { createHash, createSalt, verifyHash } = require('./bcrypt')

const createPasswordHash = password =>
    createSalt()
        .then(salt => createHash(password, salt))

const verifyPassword = (password, hashedPassword) =>
    verifyHash(password, hashedPassword)
