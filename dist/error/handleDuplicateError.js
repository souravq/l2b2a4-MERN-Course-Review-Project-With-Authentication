"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDuplicateError = void 0;
const handleDuplicateError = (err) => {
    //const errorString = `${err.value} is not a valid ID!`
    const errorMessage = err.message;
    const regex = /\"(.*?)\"/g;
    const matches = [...errorMessage.matchAll(regex)];
    const extractedValues = matches.map((match) => match[1]);
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate Entry Error',
        errorMessage: `${extractedValues} is already exists`,
    };
};
exports.handleDuplicateError = handleDuplicateError;
