const AppError = require("./error-handler");
const  { StatusCodes } = require('http-status-codes');

class ValidationError extends AppError {
    constructor(error){
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach(err => {
            explanation.push(err.message);
        });
        super(
            StatusCodes.BAD_REQUEST,
            errorName,
            'Not able to validate the incoming user request data',
            explanation
        );
    }
}

module.exports = ValidationError;