"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyMessagesUseCase = void 0;
const getMyMessagesUseCase = (dependencies) => {
    const { repositories: { getMyMessages }, } = dependencies;
    return {
        execute: async (data) => {
            return await getMyMessages(data);
        },
    };
};
exports.getMyMessagesUseCase = getMyMessagesUseCase;
