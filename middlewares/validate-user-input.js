const { body } = require('express-validator')

const validateEmailPassword = () => {
    return [body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must enter the password!')]
}

const validateEmailPasswordUsernameCountry = () => {
    return [
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
    ]
}



module.exports = {
    validateEmailPassword,
    validateEmailPasswordUsernameCountry
}