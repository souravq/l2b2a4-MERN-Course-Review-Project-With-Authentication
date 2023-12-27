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
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const category_validation_1 = __importDefault(require("./category.validation"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
// Create Category
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get Category data
        const categoryData = req.body;
        // Apply Zod Validation
        const validateCategoryData = yield category_validation_1.default.parse(categoryData);
        const result = yield category_service_1.CategoryService.createCategoryIntoDB(validateCategoryData);
        if (result) {
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.CREATED,
                message: 'Category created successfully',
                data: {
                    _id: result._id,
                    name: result.name,
                },
            });
        }
    }
    catch (err) {
        next(err);
    }
});
// Get All category
const getAllCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.CategoryService.getAllCategory();
        if (result) {
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Categories retrieved successfully',
                data: result.map((data) => {
                    return {
                        _id: data._id,
                        name: data.name,
                    };
                }),
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.CategoryController = {
    createCategory,
    getAllCategory,
};
