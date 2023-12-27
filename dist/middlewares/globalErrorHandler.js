"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = require("../error/handleZodError");
const handleValidationError_1 = require("../error/handleValidationError");
const handleCastError_1 = require("../error/handleCastError");
const handleDuplicateError_1 = require("../error/handleDuplicateError");
const handleAppError_1 = __importDefault(require("../error/handleAppError"));
const globalErrorHandler = (err, req, res, next) => {
    // Setting Default values
    let statusCode = err.statusCode || 500;
    const success = false;
    let message = err.message || 'Something went wrong!!!';
    let errorMessage = err.message || 'Something went wrong!!!';
    console.log(err);
    if (err instanceof zod_1.ZodError) {
        const zodErrorDetails = (0, handleZodError_1.handleZodError)(err);
        statusCode = zodErrorDetails === null || zodErrorDetails === void 0 ? void 0 : zodErrorDetails.statusCode;
        message = zodErrorDetails === null || zodErrorDetails === void 0 ? void 0 : zodErrorDetails.message;
        errorMessage = zodErrorDetails === null || zodErrorDetails === void 0 ? void 0 : zodErrorDetails.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const validationErrorDetails = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.statusCode;
        message = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.message;
        errorMessage = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const validationErrorDetails = (0, handleCastError_1.handleCastError)(err);
        statusCode = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.statusCode;
        message = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.message;
        errorMessage = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.errorMessage;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const validationErrorDetails = (0, handleDuplicateError_1.handleDuplicateError)(err);
        statusCode = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.statusCode;
        message = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.message;
        errorMessage = validationErrorDetails === null || validationErrorDetails === void 0 ? void 0 : validationErrorDetails.errorMessage;
    }
    else if (err instanceof handleAppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        message = err.message;
    }
    return res.status(statusCode).json({
        success,
        message,
        errorMessage,
        errorDetails: err,
        stack: err.stack,
    });
};
exports.default = globalErrorHandler;
