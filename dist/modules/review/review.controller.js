"use strict";
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
exports.reviewController = void 0;
const review_services_1 = require("./review.services");
const review_validation_1 = __importDefault(require("./review.validation"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get review Data
        const reviewData = Object.assign({}, req.body);
        // Apply ZOD validation
        const validateData = yield review_validation_1.default.parse(reviewData);
        // Call Review Service
        const result = yield review_services_1.reviewService.createReviewIntoDB(reviewData);
        if (result) {
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.CREATED,
                message: 'Review created successfully',
                data: {
                    _id: result._id,
                    courseId: result.courseId,
                    rating: result.rating,
                    review: result.review,
                },
            });
        }
    }
    catch (err) {
        //console.log(err)
        next(err);
    }
});
exports.reviewController = {
    createReview,
};
