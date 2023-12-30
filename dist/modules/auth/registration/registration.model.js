"use strict";
/* eslint-disable @typescript-eslint/no-this-alias */
// 2. Create a Schema corresponding to the document interface.
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
exports.RegisterUser = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const handleAppError_1 = __importDefault(require("../../../error/handleAppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../../config");
const strongPasswordCheck_1 = __importDefault(require("../../../utils/strongPasswordCheck"));
const passwordHistorySchema = new mongoose_1.Schema({
    password: {
        type: String,
    },
    timestamp: {
        type: Date,
    },
});
const registerUserSchema = new mongoose_1.Schema({
    username: {
        type: 'String',
        required: [true, 'Username is required.'],
        unique: true,
    },
    email: {
        type: 'String',
        required: [true, 'Email is required.'],
        unique: true,
    },
    password: { type: 'String', required: [true, 'Password is required.'] },
    passwordHistory: { type: [passwordHistorySchema] },
    role: {
        type: 'String',
        enum: {
            values: ['user', 'admin'],
            message: 'Invalid Role. Must be one of: user, admin',
        },
        required: [true, 'Role is required.'],
        default: 'user',
    },
}, {
    timestamps: true,
});
// Creating Pre Middleware for Password encryption
registerUserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if ((0, strongPasswordCheck_1.default)(user.password)) {
            throw new handleAppError_1.default(http_status_1.default.BAD_REQUEST, (0, strongPasswordCheck_1.default)(user.password));
        }
        user.password = yield bcrypt_1.default.hash(user.password, parseInt(config_1.configData.bcrypt_salt_rounds));
        user.passwordHistory.push({
            password: user.password,
            timestamp: new Date(),
        });
        next();
    });
});
// 3. Create a Model.
exports.RegisterUser = (0, mongoose_1.model)('RegisterUser', registerUserSchema);
