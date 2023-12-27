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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
/* eslint-disable no-useless-catch */
const mongodb_1 = require("mongodb");
const course_model_1 = require("./course.model");
const review_model_1 = require("../review/review.model");
const updatedTags_1 = require("../../utils/updatedTags");
const durationInWeeks_1 = __importDefault(require("../../utils/durationInWeeks"));
const category_model_1 = require("../category/category.model");
// Create Course
const createCourseIntoDB = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-useless-catch
    try {
        // Check Category Id exist or not
        const existingCategory = yield category_model_1.Category.findById(courseData.categoryId);
        if (!existingCategory) {
            throw new Error('Category not found');
        }
        const newCourse = yield course_model_1.Course.create(courseData);
        return newCourse;
    }
    catch (err) {
        throw err;
    }
});
// Course Search and Filter
const courseSearchAndFilter = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Copy the query data
        const queryObject = Object.assign({}, queryData);
        /* Which fields have to exclude */
        const excludeFields = [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
            'minPrice',
            'maxPrice',
            'startDate',
            'endDate',
            'level',
            'durationInWeeks',
            'tags',
        ];
        excludeFields.forEach((data) => delete queryObject[data]);
        // If language available
        if (typeof queryObject.language === 'string') {
            queryObject.language = new RegExp(queryObject.language, 'i');
        }
        //If provider available
        if (typeof queryObject.provider === 'string') {
            queryObject.provider = new RegExp(queryObject.provider, 'i');
        }
        // Build query
        let query = course_model_1.Course.find(Object.assign({}, queryObject));
        // If level available
        if (typeof queryData.level === 'string') {
            query = query.find({
                'details.level': new RegExp(queryData.level, 'i'),
            });
        }
        // If durationInWeeks available
        if (queryData.durationInWeeks) {
            query = query.find({ durationInWeeks: queryData.durationInWeeks });
        }
        // If Start Date and End date are available
        if (queryData.startDate && queryData.endDate) {
            query = query.find({
                $and: [
                    { startDate: { $gte: queryData.startDate } },
                    { endDate: { $lte: queryData.endDate } },
                ],
            });
        }
        // If minPrice and MaxPrice are Available
        if (queryData.minPrice && queryData.maxPrice) {
            query = query.find({
                price: { $gte: queryData.minPrice, $lte: queryData.maxPrice },
            });
        }
        // If tag available
        if (queryData.tags) {
            query = query.find({
                tags: {
                    $elemMatch: { name: queryData.tags },
                },
            });
        }
        // Sorting
        if (typeof queryData.sortBy === 'string') {
            const sortByValue = queryData.sortBy;
            const allowSortFields = [
                'title',
                'price',
                'startDate',
                'endDate',
                'language',
                'durationInWeeks',
            ];
            if (allowSortFields.includes(sortByValue)) {
                if (queryData.sortOrder) {
                    if (queryData.sortOrder === 'asc') {
                        query = query.sort(sortByValue);
                    }
                    else if (queryData.sortOrder === 'desc') {
                        query = query.sort(`-${sortByValue}`);
                    }
                }
                else {
                    query = query.sort(sortByValue);
                }
            }
        }
        else {
            query = query.sort({ createdAt: -1 });
        }
        // Pagination
        let page = 1;
        let limit = 10;
        if (typeof queryData.page === 'string') {
            page = parseInt(queryData.page) || 1;
        }
        if (typeof queryData.limit === 'string') {
            limit = parseInt(queryData.limit) || 10;
        }
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        const result = yield query.exec();
        const total = result.length;
        const metaData = {
            page,
            limit,
            total,
        };
        return {
            result,
            metaData,
        };
    }
    catch (err) {
        throw err;
    }
});
// Update Course
const updateCourseIntoDB = (courseId, courseData) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line no-useless-catch
    try {
        // Check Course Id exist or not
        const existingCourse = yield course_model_1.Course.findById(courseId);
        if (!existingCourse) {
            throw new Error('Course not found');
        }
        const { tags, details } = courseData, remainingField = __rest(courseData, ["tags", "details"]);
        const modifiedData = Object.assign({}, remainingField);
        // Calculate Duration In Week
        let week = 0;
        if (typeof modifiedData.startDate === 'string' &&
            typeof modifiedData.endDate === 'string') {
            week = (0, durationInWeeks_1.default)(modifiedData.startDate, modifiedData.endDate);
            modifiedData['durationInWeeks'] = week;
        }
        // Check if durationInWeeks data without start date and end date
        if ((modifiedData === null || modifiedData === void 0 ? void 0 : modifiedData.durationInWeeks) &&
            !(typeof (modifiedData === null || modifiedData === void 0 ? void 0 : modifiedData.startDate) === 'string' &&
                typeof (modifiedData === null || modifiedData === void 0 ? void 0 : modifiedData.endDate) === 'string')) {
            throw new Error("DurationInWeeks can't be update without start date and end date");
        }
        // Start date and End date both checked
        if (typeof (modifiedData === null || modifiedData === void 0 ? void 0 : modifiedData.startDate) === 'string') {
            if (!(typeof (modifiedData === null || modifiedData === void 0 ? void 0 : modifiedData.endDate) === 'string'))
                throw new Error("Start date can't be update without end date");
        }
        if (typeof (modifiedData === null || modifiedData === void 0 ? void 0 : modifiedData.endDate) === 'string') {
            if (!(typeof (modifiedData === null || modifiedData === void 0 ? void 0 : modifiedData.startDate) === 'string'))
                throw new Error("End date can't be update without start date");
        }
        // Check Category Id exist or not
        if (modifiedData.categoryId) {
            const existingCategory = yield category_model_1.Category.findById(modifiedData.categoryId);
            if (!existingCategory) {
                throw new Error('Category not found');
            }
        }
        if (details && Object.keys(details).length > 0) {
            for (const [keys, value] of Object.entries(details)) {
                modifiedData[`details.${keys}`] = value;
            }
        }
        let result = yield course_model_1.Course.findOneAndUpdate({ _id: new mongodb_1.ObjectId(courseId) }, { $set: modifiedData }, { new: true, runValidators: true });
        // For Course Tags
        if (tags) {
            let backupTags = [...tags];
            const existingTags = result === null || result === void 0 ? void 0 : result.tags;
            // Update existing tags
            tags.forEach((data1) => __awaiter(void 0, void 0, void 0, function* () {
                existingTags === null || existingTags === void 0 ? void 0 : existingTags.forEach((data2) => __awaiter(void 0, void 0, void 0, function* () {
                    if (data1.name == data2.name) {
                        yield course_model_1.Course.findOneAndUpdate({ _id: new mongodb_1.ObjectId(courseId), 'tags.name': data1.name }, { $set: { 'tags.$.isDeleted': data1.isDeleted } }, {
                            new: true,
                        });
                    }
                }));
            }));
            // Filter existing tags
            tags.forEach((data1) => __awaiter(void 0, void 0, void 0, function* () {
                existingTags === null || existingTags === void 0 ? void 0 : existingTags.forEach((data2) => __awaiter(void 0, void 0, void 0, function* () {
                    if (data1.name == data2.name) {
                        backupTags = backupTags.filter((data3) => data3.name !== data1.name);
                    }
                }));
            }));
            // Add new tags
            result = yield course_model_1.Course.findOneAndUpdate({ _id: new mongodb_1.ObjectId(courseId) }, {
                $push: { tags: backupTags },
            }, {
                new: true,
            });
        }
        // Get expected tags
        const newTags = result &&
            result.tags.map((data) => {
                if (data.isDeleted === false) {
                    return {
                        name: data.name,
                        isDeleted: data.isDeleted,
                    };
                }
            });
        const filteredTags = newTags === null || newTags === void 0 ? void 0 : newTags.filter(function (el) {
            return el != null;
        });
        // Updated Expected Response
        const expectedResult = {
            title: result === null || result === void 0 ? void 0 : result.title,
            instructor: result === null || result === void 0 ? void 0 : result.instructor,
            categoryId: result === null || result === void 0 ? void 0 : result.categoryId,
            price: result === null || result === void 0 ? void 0 : result.price,
            tags: filteredTags,
            startDate: result === null || result === void 0 ? void 0 : result.startDate,
            endDate: result === null || result === void 0 ? void 0 : result.endDate,
            language: result === null || result === void 0 ? void 0 : result.language,
            provider: result === null || result === void 0 ? void 0 : result.provider,
            durationInWeeks: result === null || result === void 0 ? void 0 : result.durationInWeeks,
            details: result === null || result === void 0 ? void 0 : result.details,
        };
        return expectedResult;
    }
    catch (err) {
        throw err;
    }
});
//Get Course by ID with Reviews
const getCourseByIdWithReview = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get Course Data
        const courseData = yield course_model_1.Course.findById({
            _id: new mongodb_1.ObjectId(courseId),
        });
        if (!courseData) {
            throw new Error('Course not found');
        }
        // Get Review Data
        const reviewResult = yield review_model_1.Review.find({ courseId });
        const exactReviewResult = reviewResult &&
            reviewResult.map((result) => {
                return {
                    courseId: result.courseId,
                    rating: result.rating,
                    review: result.review,
                };
            });
        // Merge two result
        const result = {
            course: {
                _id: courseData === null || courseData === void 0 ? void 0 : courseData._id,
                title: courseData === null || courseData === void 0 ? void 0 : courseData.title,
                instructor: courseData === null || courseData === void 0 ? void 0 : courseData.instructor,
                categoryId: courseData === null || courseData === void 0 ? void 0 : courseData.categoryId,
                price: courseData === null || courseData === void 0 ? void 0 : courseData.price,
                tags: courseData && (0, updatedTags_1.updatedTags)(courseData === null || courseData === void 0 ? void 0 : courseData.tags),
                startDate: courseData === null || courseData === void 0 ? void 0 : courseData.startDate,
                endDate: courseData === null || courseData === void 0 ? void 0 : courseData.endDate,
                language: courseData === null || courseData === void 0 ? void 0 : courseData.language,
                provider: courseData === null || courseData === void 0 ? void 0 : courseData.provider,
                details: courseData === null || courseData === void 0 ? void 0 : courseData.details,
            },
            reviews: exactReviewResult,
        };
        return result;
    }
    catch (err) {
        throw err;
    }
});
// Get the Best Course
const getBestCourse = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bestCourseResult = yield review_model_1.Review.aggregate([
            {
                $group: {
                    _id: '$courseId',
                    averageRating: { $avg: '$rating' },
                    reviewCount: { $sum: 1 },
                },
            },
            {
                $sort: {
                    averageRating: -1,
                },
            },
            {
                $limit: 1,
            },
        ]);
        if (!bestCourseResult) {
            throw new Error('Rating not found');
        }
        // Getting Course Id
        const courseId = bestCourseResult[0]._id;
        // Fetch Course Data
        const courseData = yield course_model_1.Course.findById({ _id: courseId });
        //Expected Result
        const result = {
            course: {
                _id: courseData === null || courseData === void 0 ? void 0 : courseData._id,
                title: courseData === null || courseData === void 0 ? void 0 : courseData.title,
                instructor: courseData === null || courseData === void 0 ? void 0 : courseData.instructor,
                categoryId: courseData === null || courseData === void 0 ? void 0 : courseData.categoryId,
                price: courseData === null || courseData === void 0 ? void 0 : courseData.price,
                tags: courseData && (0, updatedTags_1.updatedTags)(courseData === null || courseData === void 0 ? void 0 : courseData.tags),
                startDate: courseData === null || courseData === void 0 ? void 0 : courseData.startDate,
                endDate: courseData === null || courseData === void 0 ? void 0 : courseData.endDate,
                language: courseData === null || courseData === void 0 ? void 0 : courseData.language,
                provider: courseData === null || courseData === void 0 ? void 0 : courseData.provider,
                details: courseData === null || courseData === void 0 ? void 0 : courseData.details,
            },
            averageRating: bestCourseResult[0].averageRating,
            reviewCount: bestCourseResult[0].reviewCount,
        };
        return result;
    }
    catch (err) {
        throw err;
    }
});
exports.CourseService = {
    createCourseIntoDB,
    courseSearchAndFilter,
    updateCourseIntoDB,
    getCourseByIdWithReview,
    getBestCourse,
};
