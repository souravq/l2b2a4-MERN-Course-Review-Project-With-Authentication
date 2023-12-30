"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isStrongPassword = (password) => {
    const errors = [];
    // Minimum length requirement
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long.');
    }
    // Uppercase and lowercase letters requirement
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        errors.push('Include both uppercase and lowercase letters in your password.');
    }
    // Number requirement
    if (!/\d/.test(password)) {
        errors.push('Add at least one number to enhance security.');
    }
    // Special character requirement
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Include a special character for stronger protection.');
    }
    // Combine error messages
    return errors.length > 0 ? errors.join(' ') : null;
};
exports.default = isStrongPassword;
