"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserUseCase = void 0;
const createUserUseCase = (dependencies) => {
    const { repositories: { createUser }, } = dependencies;
    return {
        execute: async (data) => {
            return await createUser(data);
        },
    };
};
exports.createUserUseCase = createUserUseCase;
