
const { validationResult } = require('express-validator')

const RequestValidationError = require('../errors/request-validation-error')

module.exports = validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array())
    }
    next();
};