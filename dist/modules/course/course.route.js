"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRouter = void 0;
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("./course.controller");
const router = express_1.default.Router();
const updateRouter = express_1.default.Router();
router.post('/', course_controller_1.CourseController.createCourse);
router.get('/best', course_controller_1.CourseController.getBestCourse);
updateRouter.get('/', course_controller_1.CourseController.courseSearchAndFilter);
updateRouter.put('/:courseId', course_controller_1.CourseController.updateCourse);
updateRouter.get('/:courseId/reviews', course_controller_1.CourseController.getCourseByIdWithReview);
exports.courseRouter = {
    router,
    updateRouter,
};
