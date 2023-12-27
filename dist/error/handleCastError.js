"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errorString = `${err.value} is not a valid ID!`;
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessage: errorString.trim(),
    };
};
exports.handleCastError = handleCastError;
