"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordUseCase = void 0;
const forgotPasswordUseCase = (dependencies) => {
    const { repositories: { forgotPassword }, } = dependencies;
    return {
        execute: async (data) => {
            return await forgotPassword(data);
        },
    };
};
exports.forgotPasswordUseCase = forgotPasswordUseCase;
