"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
//import auth from '../../middlewares/auth'
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', category_controller_1.CategoryController.createCategory);
router.get('/', (0, auth_1.default)('user', 'admin'), category_controller_1.CategoryController.getAllCategory);
exports.categoryRouter = {
    router,
};
