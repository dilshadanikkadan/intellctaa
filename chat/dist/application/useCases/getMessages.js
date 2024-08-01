"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesUseCase = void 0;
const getMessagesUseCase = (dependencies) => {
    const { repositories: { getMessages }, } = dependencies;
    return {
        execute: async (data) => {
            return await getMessages(data);
        },
    };
};
exports.getMessagesUseCase = getMessagesUseCase;
