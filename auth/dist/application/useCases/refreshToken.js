"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenUseCase = void 0;
const refreshTokenUseCase = (dependencies) => {
    const { repositories: { refreshToken }, } = dependencies;
    return {
        execute: async (data) => {
            console.log("data from usecse verify", data);
            return await refreshToken(data);
        },
    };
};
exports.refreshTokenUseCase = refreshTokenUseCase;
