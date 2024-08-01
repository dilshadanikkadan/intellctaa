"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webHookUseCase = void 0;
const webHookUseCase = (dependencies) => {
    const { repositories: { webHook }, } = dependencies;
    return {
        execute: async (data) => {
            return await webHook(data);
        },
    };
};
exports.webHookUseCase = webHookUseCase;
