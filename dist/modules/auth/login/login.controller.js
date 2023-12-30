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
exports.LoginUserController = void 0;
const login_service_1 = require("./login.service");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const login_validation_1 = __importDefault(require("./login.validation"));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Apply zod validation
        const validateData = yield login_validation_1.default.parse(req.body);
        const result = yield login_service_1.LoginUserService.loginUser(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'User login successful',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.LoginUserController = {
    loginUser,
};
