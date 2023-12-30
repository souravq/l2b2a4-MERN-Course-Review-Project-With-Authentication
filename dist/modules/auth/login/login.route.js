"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRouter = void 0;
const express_1 = __importDefault(require("express"));
const login_controller_1 = require("./login.controller");
const router = express_1.default.Router();
router.post('/', login_controller_1.LoginUserController.loginUser);
exports.LoginRouter = router;
