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
exports.CourseController = void 0;
const course_service_1 = require("./course.service");
const durationInWeeks_1 = __importDefault(require("../../utils/durationInWeeks"));
const course_validation_1 = __importDefault(require("./course.validation"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Course
const createCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Getting Body Data
        const courseData = Object.assign({}, req.body);
        // Apply Zod Validation
        const validateCourseData = yield course_validation_1.default.parse(courseData);
        // Calculate Duration In Week
        let week = 0;
        if (courseData.startDate && courseData.endDate) {
            week = (0, durationInWeeks_1.default)(courseData.startDate, courseData.endDate);
            courseData['durationInWeeks'] = week;
        }
        // Call Service function
        const result = yield course_service_1.CourseService.createCourseIntoDB(courseData);
        if (result) {
            // Get expected tags
            const newTags = result &&
                result.tags.map((data) => {
                    return {
                        name: data.name,
                        isDeleted: data.isDeleted,
                    };
                });
            // Extract needed data from result
            const resultData = {
                _id: result._id,
                title: result.title,
                instructor: result.instructor,
                categoryId: result.categoryId,
                price: result.price,
                tags: newTags,
                startDate: result.startDate,
                endDate: result.endDate,
                language: result.language,
                provider: result.provider,
                durationInWeeks: result.durationInWeeks,
                details: result.details,
            };
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.CREATED,
                message: 'Course created successfully',
                data: resultData,
            });
        }
    }
    catch (err) {
        next(err);
    }
});
// Course Search And Filter
const courseSearchAndFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchData = Object.assign({}, req.query);
        const resultData = yield course_service_1.CourseService.courseSearchAndFilter(searchData);
        // sendResponse(res, {
        //   success: true,
        //   statusCode: httpStatus.OK,
        //   message: 'Courses retrieved successfully',
        //   data: resultData?.result,
        // })
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Courses retrieved successfully',
            meta: resultData === null || resultData === void 0 ? void 0 : resultData.metaData,
            data: resultData === null || resultData === void 0 ? void 0 : resultData.result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
//Course Update
const updateCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get Course Id
        const courseId = req.params.courseId;
        // Get updated body data
        const updatedData = req.body;
        const result = yield course_service_1.CourseService.updateCourseIntoDB(courseId, updatedData);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Course updated successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
//Get Course by ID with Reviews
const getCourseByIdWithReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.courseId;
        const result = yield course_service_1.CourseService.getCourseByIdWithReview(courseId);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Course and Reviews retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// Get Best Course
const getBestCourse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield course_service_1.CourseService.getBestCourse();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Best course retrieved successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.CourseController = {
    createCourse,
    courseSearchAndFilter,
    updateCourse,
    getCourseByIdWithReview,
    getBestCourse,
};
