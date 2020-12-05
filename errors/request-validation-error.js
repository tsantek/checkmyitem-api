const CustomError = require('./custom-error')

class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(errors) {
        super('Invalid request parameters!');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
        this.newError = errors
    }

    serializeErrors() {
        return this.newError.map((error) => ({
            message: error.msg,
            field: error.param,
        }));
    }
}

module.exports = RequestValidationError