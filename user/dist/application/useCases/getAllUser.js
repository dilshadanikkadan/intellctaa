"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserUseCase = void 0;
const getAllUserUseCase = (dependencies) => {
    const { repositories: { getAllUser }, } = dependencies;
    return {
        execute: async (data) => {
            return await getAllUser(data);
        },
    };
};
exports.getAllUserUseCase = getAllUserUseCase;
