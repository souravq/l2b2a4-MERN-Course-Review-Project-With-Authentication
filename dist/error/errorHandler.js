"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.name === "ValidationError") {
        // Handle Mongoose validation errors
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
    // Handle other types of errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
exports.default = errorHandler;
