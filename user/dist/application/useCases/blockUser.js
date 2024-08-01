"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUseCase = void 0;
const blockUseCase = (dependencies) => {
    const { repositories: { blockUser }, } = dependencies;
    return {
        execute: async (data) => {
            return await blockUser(data);
        },
    };
};
exports.blockUseCase = blockUseCase;
