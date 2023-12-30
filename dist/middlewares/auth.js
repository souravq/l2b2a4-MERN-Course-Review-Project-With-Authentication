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
const handleAppError_1 = __importDefault(require("../error/handleAppError"));
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const authWrapper = (...roles) => {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.authorization;
                // Check Token is exist or not
                if (!token) {
                    throw new handleAppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
                }
                // Verify The Token
                jsonwebtoken_1.default.verify(token, config_1.configData.jwt_access_secret, function (err, decoded) {
                    if (err) {
                        throw new handleAppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
                    }
                    else {
                        const role = decoded === null || decoded === void 0 ? void 0 : decoded.role;
                        // Check role is Authorized
                        if (roles && !roles.includes(role)) {
                            throw new handleAppError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
                        }
                        else {
                            console.log('Authorized User');
                            const userData = decoded;
                            req.user = {
                                _id: userData._id,
                                role: userData.role,
                                email: userData.email,
                            };
                        }
                    }
                });
                next();
            }
            catch (err) {
                next(err);
            }
        });
    };
};
exports.default = authWrapper;
