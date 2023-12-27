"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = require("./config");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send(`Course Review API SUITS is running on PORT ${config_1.configData.port}`);
});
// Common routes used
app.use('/api', routes_1.default);
// Middleware - Error Handler
app.use(globalErrorHandler_1.default);
// Not found - Middleware
app.use(notFound_1.default);
exports.default = app;
