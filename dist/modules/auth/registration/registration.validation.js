"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const registerUserZodSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: 'Username is required.' }),
    email: zod_1.z.string({ required_error: 'Email is required.' }),
    password: zod_1.z.string({ required_error: 'Password is required.' }),
    passwordHistory: zod_1.z.array(zod_1.z.string()).optional(),
    role: zod_1.z.enum(['user', 'admin']).optional(),
});
exports.default = registerUserZodSchema;
