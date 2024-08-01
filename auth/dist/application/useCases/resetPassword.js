"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordUseCase = void 0;
const resetPasswordUseCase = (dependencies) => {
    const { repositories: { resetPassword }, } = dependencies;
    return {
        execute: async (data) => {
            return await resetPassword(data);
        },
    };
};
exports.resetPasswordUseCase = resetPasswordUseCase;
