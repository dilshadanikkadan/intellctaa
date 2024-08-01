"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorStaticsUseCase = void 0;
const instructorStaticsUseCase = (dependencies) => {
    const { repositories: { instructorStatics }, } = dependencies;
    return {
        execute: async (data) => {
            return await instructorStatics(data);
        },
    };
};
exports.instructorStaticsUseCase = instructorStaticsUseCase;
