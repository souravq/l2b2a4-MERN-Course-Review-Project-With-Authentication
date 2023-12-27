"use strict";
// Create Review
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const course_model_1 = require("../course/course.model");
const review_model_1 = require("./review.model");
const createReviewIntoDB = (reviewData) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = reviewData;
    // eslint-disable-next-line no-useless-catch
    try {
        if (!courseId) {
            throw new Error('Please give courseId');
        }
        const existingCourse = yield course_model_1.Course.findById(courseId);
        if (!existingCourse) {
            throw new Error('Course not found');
        }
        const result = yield review_model_1.Review.create(reviewData);
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.reviewService = {
    createReviewIntoDB,
};
