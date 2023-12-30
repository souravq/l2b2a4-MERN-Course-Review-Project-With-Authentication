"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const registration_controller_1 = require("./registration.controller");
const router = express_1.default.Router();
router.post('/', registration_controller_1.RegisterUserController.registerUser);
exports.RegisterRoutes = router;
