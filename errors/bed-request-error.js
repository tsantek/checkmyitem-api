const CustomError = require('./custom-error')

class BadRequestError extends CustomError {
    statusCode = 200;

    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.message = message
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}

module.exports = BadRequestError