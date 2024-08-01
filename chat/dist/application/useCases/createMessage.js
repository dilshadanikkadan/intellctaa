"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageUseCase = void 0;
const createMessageUseCase = (dependencies) => {
    const { repositories: { createMessage }, } = dependencies;
    return {
        execute: async (data) => {
            return await createMessage(data);
        },
    };
};
exports.createMessageUseCase = createMessageUseCase;
