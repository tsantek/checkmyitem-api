const CustomError = require('./custom-error')

class NotFoundError extends CustomError {
    statusCode = 404;

    reason = 'Not Found';

    constructor() {
        super('Route not find!');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.reason }];
    }
}

module.exports = NotFoundError