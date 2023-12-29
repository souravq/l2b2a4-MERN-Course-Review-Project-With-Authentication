"use strict";
// Create Category Schema
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const registration_model_1 = require("../auth/registration/registration.model");
const CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Course Category name is required'],
        unique: true,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: registration_model_1.RegisterUser,
    },
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
