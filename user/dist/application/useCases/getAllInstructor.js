"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInstructorUseCase = void 0;
const getAllInstructorUseCase = (dependencies) => {
    const { repositories: { getAllInstructor }, } = dependencies;
    return {
        execute: async (data) => {
            return await getAllInstructor(data);
        },
    };
};
exports.getAllInstructorUseCase = getAllInstructorUseCase;
