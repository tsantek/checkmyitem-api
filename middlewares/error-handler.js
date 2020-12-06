const CustomError = require('../errors/custom-error')

// eslint-disable-next-line import/prefer-default-export
const errorHandler = (err, req, res, next) => {
    // check instance of error
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    res.status(400).send({
        errors: [{ message: 'Something went wrong!' }],
    });
};

module.exports = errorHandler
