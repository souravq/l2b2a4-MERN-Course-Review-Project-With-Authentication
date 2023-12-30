"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordRoute = void 0;
const express_1 = __importDefault(require("express"));
const changePassword_controller_1 = require("./changePassword.controller");
const auth_1 = __importDefault(require("../../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)('user', 'admin'), changePassword_controller_1.changePasswordController.changePassword);
exports.ChangePasswordRoute = router;
