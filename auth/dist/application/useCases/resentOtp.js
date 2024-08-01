"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resentOtpUseCase = void 0;
const resentOtpUseCase = (dependencies) => {
    const { repositories: { resentOtp }, } = dependencies;
    return {
        execute: async (data) => {
            console.log("data from usecse verify", data);
            return await resentOtp(data);
        },
    };
};
exports.resentOtpUseCase = resentOtpUseCase;
