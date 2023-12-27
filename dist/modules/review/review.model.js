"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, 'Course ID is required'],
        ref: 'Course',
    },
    rating: { type: Number, required: [true, 'Rating is required'] },
    review: { type: String, required: [true, 'Review is required'] },
});
exports.Review = (0, mongoose_1.model)('Review', ReviewSchema);
