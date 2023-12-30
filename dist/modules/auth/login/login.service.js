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
exports.LoginUserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const registration_model_1 = require("../registration/registration.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleAppError_1 = __importDefault(require("../../../error/handleAppError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
const loginUser = (loginUserData) => __awaiter(void 0, void 0, void 0, function* () {
    //Check the user exist or not
    const user = yield registration_model_1.RegisterUser.findOne({
        username: loginUserData === null || loginUserData === void 0 ? void 0 : loginUserData.username,
    });
    if (!user) {
        throw new handleAppError_1.default(http_status_1.default.FORBIDDEN, 'User not exist.');
    }
    // Check Password
    const isPasswordCorrect = yield bcrypt_1.default.compare(loginUserData === null || loginUserData === void 0 ? void 0 : loginUserData.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordCorrect) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, 'Password is not correct');
    }
    // Creating Data Payload
    const jsonPayload = {
        _id: user._id,
        role: user.role,
        email: user.email,
    };
    // Generate Access Token
    const accessToken = jsonwebtoken_1.default.sign(jsonPayload, config_1.configData.jwt_access_secret, { expiresIn: '10h' });
    return {
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        },
        token: accessToken,
    };
});
exports.LoginUserService = {
    loginUser,
};
