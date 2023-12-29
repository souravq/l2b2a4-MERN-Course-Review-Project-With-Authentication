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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const handleAppError_1 = __importDefault(require("../../error/handleAppError"));
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
        if (!(reviewData.rating >= 1 && reviewData.rating <= 5)) {
            throw new handleAppError_1.default(http_status_1.default.BAD_REQUEST, 'Rating, should be falls within the range of 1 to 5');
        }
        const result = yield (yield review_model_1.Review.create(reviewData)).populate('createdBy');
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.reviewService = {
    createReviewIntoDB,
};
