"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: 'Username is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }),
});
exports.default = loginZodSchema;
