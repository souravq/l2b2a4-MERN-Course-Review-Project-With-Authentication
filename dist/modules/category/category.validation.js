"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const categoryValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Category Name is required",
    }),
});
exports.default = categoryValidationSchema;
