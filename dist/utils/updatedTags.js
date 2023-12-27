"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedTags = void 0;
const updatedTags = (tags) => {
    const newTags = tags.map((data) => {
        return {
            name: data.name,
            isDeleted: data.isDeleted,
        };
    });
    return newTags;
};
exports.updatedTags = updatedTags;
