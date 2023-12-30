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
exports.ChangePasswordService = void 0;
const registration_model_1 = require("../registration/registration.model");
const handleAppError_1 = __importDefault(require("../../../error/handleAppError"));
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../../../config");
const strongPasswordCheck_1 = __importDefault(require("../../../utils/strongPasswordCheck"));
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, role, email } = userData;
    // Check the User is exist or not
    const user = yield registration_model_1.RegisterUser.findOne({ _id: _id });
    if (!user) {
        throw new handleAppError_1.default(http_status_1.default.FORBIDDEN, 'User not exist.');
    }
    // Check Password
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.currentPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordCorrect) {
        throw new handleAppError_1.default(http_status_1.default.NOT_FOUND, 'Current Password is not correct');
    }
    if ((0, strongPasswordCheck_1.default)(payload === null || payload === void 0 ? void 0 : payload.newPassword)) {
        throw new handleAppError_1.default(http_status_1.default.BAD_REQUEST, (0, strongPasswordCheck_1.default)(payload === null || payload === void 0 ? void 0 : payload.newPassword));
    }
    // Check Last 3 Password
    // if (payload.currentPassword === payload.newPassword) {
    //   throw new AppError(
    //     httpStatus.NOT_FOUND,
    //     'Password change failed. Ensure the new password is unique and not among the last 2 used',
    //   )
    // }
    //   const isSameAsPasswordHistory = user.passwordHistory.some((dbPassword) => {
    //     bcrypt.compare(payload.newPassword, dbPassword)
    //   })
    //   console.log(isSameAsPasswordHistory, 'hello')
    //   if (isSameAsPasswordHistory) {
    //     throw new AppError(
    //       httpStatus.NOT_FOUND,
    //       'Password change failed. Ensure the new password is unique and not among the last 2 used used',
    //     )
    //   }
    const isSameAsPasswordHistory = yield Promise.all(user.passwordHistory.map((dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
        return bcrypt_1.default.compare(payload.newPassword, dbPassword.password);
    })));
    let index1 = 0;
    if (isSameAsPasswordHistory.some((result, index) => {
        index1 = index;
        return result;
    })) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        const formattedDate = user.passwordHistory[index1].timestamp.toLocaleDateString('en-US', options);
        const dateTimeArr = formattedDate.split(',');
        const dateArr = dateTimeArr[0].split('/');
        throw new handleAppError_1.default(http_status_1.default.BAD_REQUEST, `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${dateArr[2]}-${dateArr[0]}-${dateArr[1]} at${dateTimeArr[1]}).`);
        // const passwordChangeFailedResponse = `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${dateArr[2]}-${dateArr[0]}-${dateArr[1]} at${dateTimeArr[1]}).`
        // return passwordChangeFailedResponse
    }
    // Hashed new Password
    const newHashedPassword = yield bcrypt_1.default.hash(payload === null || payload === void 0 ? void 0 : payload.newPassword, parseInt(config_1.configData.bcrypt_salt_rounds));
    const newPasswordHistory = user.passwordHistory;
    newPasswordHistory.push({
        password: newHashedPassword,
        timestamp: new Date(),
    });
    // Check History Password limit
    if (newPasswordHistory.length > 3) {
        newPasswordHistory.shift();
    }
    const result = yield registration_model_1.RegisterUser.findOneAndUpdate({ _id: _id, role: role, email: email }, { password: newHashedPassword, passwordHistory: newPasswordHistory }, { new: true });
    return result;
});
exports.ChangePasswordService = {
    changePassword,
};
