const  { StatusCodes } = require('http-status-codes');

class AppError extends Error {
    constructor(
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR,
        name='AppError',
        message='Oops! Something went wrong!',
        explanation='Oops! Something went wrong!'
    ){
        super();
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = AppError;