"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileUseCase = void 0;
const updateProfileUseCase = (dependencies) => {
    const { repositories: { updateProfile }, } = dependencies;
    return {
        execute: async (data) => {
            return await updateProfile(data);
        },
    };
};
exports.updateProfileUseCase = updateProfileUseCase;
