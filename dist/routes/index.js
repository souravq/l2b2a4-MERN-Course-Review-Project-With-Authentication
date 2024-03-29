"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_route_1 = require("../modules/course/course.route");
const category_route_1 = require("../modules/category/category.route");
const review_route_1 = require("../modules/review/review.route");
const registration_route_1 = require("../modules/auth/registration/registration.route");
const login_route_1 = require("../modules/auth/login/login.route");
const changePassword_route_1 = require("../modules/auth/changePassword/changePassword.route");
const router = express_1.default.Router();
const routeObj = [
    {
        path: '/course',
        route: course_route_1.courseRouter.router,
    },
    {
        path: '/courses',
        route: course_route_1.courseRouter.updateRouter,
    },
    {
        path: '/categories',
        route: category_route_1.categoryRouter.router,
    },
    {
        path: '/reviews',
        route: review_route_1.reviewRouter.router,
    },
    {
        path: '/auth/register',
        route: registration_route_1.RegisterRoutes,
    },
    {
        path: '/auth/login',
        route: login_route_1.LoginRouter,
    },
    {
        path: '/auth/change-password',
        route: changePassword_route_1.ChangePasswordRoute,
    },
];
routeObj.forEach((routeData) => router.use(routeData.path, routeData.route));
exports.default = router;
