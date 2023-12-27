"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
const handleValidationError = (err) => {
    let errorString = '';
    const errorDetails = Object.values(err.errors).forEach((error) => {
        errorString += `${error.message}. `;
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errorString.trim(),
    };
};
exports.handleValidationError = handleValidationError;
