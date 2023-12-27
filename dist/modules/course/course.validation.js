"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const zod_1 = require("zod");
// Define the Zod schema for TTag
const TagValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Tag Name is required' }),
    isDeleted: zod_1.z.boolean({ required_error: 'Tag isDeleted is required' }),
});
// Define the Zod schema for TCourse
const CourseValidationSchema = zod_1.z.object({
    title: zod_1.z.string({ required_error: 'Title is required' }),
    instructor: zod_1.z.string({ required_error: 'Instructor is required' }),
    categoryId: zod_1.z.string().refine((value) => mongodb_1.ObjectId.isValid(value), {
        message: 'Category ID must be a valid ObjectId',
    }),
    price: zod_1.z
        .number()
        .min(0, { message: 'Price must be greater than or equal to 0' }),
    tags: zod_1.z.array(TagValidationSchema),
    startDate: zod_1.z.string({ required_error: 'Start Date is required' }),
    endDate: zod_1.z.string({ required_error: 'End Date is required' }),
    language: zod_1.z.string({ required_error: 'Language is required' }),
    provider: zod_1.z.string({ required_error: 'Provider is required' }),
    durationInWeeks: zod_1.z.number().optional(),
    details: zod_1.z.object({
        level: zod_1.z.enum(['Beginner', 'Intermediate', 'Advanced']),
        description: zod_1.z.string({
            required_error: 'Details description is required',
        }),
    }),
});
exports.default = CourseValidationSchema;
