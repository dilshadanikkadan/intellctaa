"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStaticsUseCase = void 0;
const userStaticsUseCase = (dependencies) => {
    const { repositories: { userStatics }, } = dependencies;
    return {
        execute: async (data) => {
            return await userStatics(data);
        },
    };
};
exports.userStaticsUseCase = userStaticsUseCase;
