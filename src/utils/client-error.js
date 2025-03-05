const AppError = require("./error-handler");
const  { StatusCodes } = require('http-status-codes');

class ClientError extends AppError {
    constructor(
        statusCode=StatusCodes.INTERNAL_SERVER_ERROR,
        name='AppError',
        message='Oops! Something went wrong!',
        explanation='Oops! Something went wrong!'
    ){
        super(
            StatusCodes.BAD_REQUEST,
            name,
            message,
            explanation
        );
    }
}

module.exports = ClientError;