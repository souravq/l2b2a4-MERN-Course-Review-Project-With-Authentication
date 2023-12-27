"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const reviewValidationSchema = zod_1.z.object({
    rating: zod_1.z.number({
        required_error: 'Rating is required',
    }),
    review: zod_1.z.string({
        required_error: 'Review is required',
    }),
});
exports.default = reviewValidationSchema;
