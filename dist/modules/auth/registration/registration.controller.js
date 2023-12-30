"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
// Register User
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
exports.RegisterUserController = void 0;
const registration_service_1 = require("./registration.service");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const registration_validation_1 = __importDefault(require("./registration.validation"));
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Apply zod validation
        const validateData = yield registration_validation_1.default.parse(req.body);
        const result = yield registration_service_1.RegisterUserService.registerUserIntoDB(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.CREATED,
            message: 'User registered successfully',
            data: {
                _id: result._id,
                username: result.username,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt,
                updatedAt: result.updatedAt,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.RegisterUserController = {
    registerUser,
};
