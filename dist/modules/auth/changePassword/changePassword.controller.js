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
exports.changePasswordController = void 0;
const changePassword_service_1 = require("./changePassword.service");
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const changePassword_validation_1 = __importDefault(require("./changePassword.validation"));
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = Object.assign({}, req.user);
        const password = Object.assign({}, req.body);
        // Apply zod validation
        const validateData = yield changePassword_validation_1.default.parse(password);
        const result = yield changePassword_service_1.ChangePasswordService.changePassword(userData, password);
        // if (result?.includes('Password change failed')){
        //   res.status(400).json({
        //     success: false,
        //     statusCode: 400,
        //     message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${dateArr[2]}-${dateArr[0]}-${dateArr[1]} at${dateTimeArr[1]}).`,
        //     data: null,
        //   })
        // }
        // if(result?.success === false){
        // }else{
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Password changed successfully',
            data: {
                _id: result === null || result === void 0 ? void 0 : result._id,
                username: result === null || result === void 0 ? void 0 : result.username,
                email: result === null || result === void 0 ? void 0 : result.email,
                role: result === null || result === void 0 ? void 0 : result.role,
                createdAt: result === null || result === void 0 ? void 0 : result.createdAt,
                updatedAt: result === null || result === void 0 ? void 0 : result.updatedAt,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
exports.changePasswordController = {
    changePassword,
};
