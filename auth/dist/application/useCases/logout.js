"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUseCase = void 0;
const logoutUseCase = (dependencies) => {
    const { repositories: { logout }, } = dependencies;
    return {
        execute: async (data) => {
            console.log("data from usecse verify", data);
            return await logout(data);
        },
    };
};
exports.logoutUseCase = logoutUseCase;
