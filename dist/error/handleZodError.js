"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodError = void 0;
const handleZodError = (err) => {
    let errorString = '';
    const errorDetails = err.issues.forEach((error) => {
        errorString += `${error.message}. `;
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessage: errorString.trim(),
    };
};
exports.handleZodError = handleZodError;
