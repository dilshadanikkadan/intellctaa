"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorCreateUseCase = void 0;
const instructorCreateUseCase = (dependencies) => {
    const { repositories: { instructorCreate }, } = dependencies;
    return {
        execute: async (data) => {
            return await instructorCreate(data);
        },
    };
};
exports.instructorCreateUseCase = instructorCreateUseCase;
