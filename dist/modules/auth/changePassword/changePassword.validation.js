"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const changePasswordZodSchema = zod_1.z.object({
    currentPassword: zod_1.z.string({ required_error: 'Current Password is required' }),
    newPassword: zod_1.z.string({ required_error: 'New Password is required' }),
});
exports.default = changePasswordZodSchema;
