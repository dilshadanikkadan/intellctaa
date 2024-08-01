"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpUseCase = void 0;
const verifyOtpUseCase = (dependencies) => {
    const { repositories: { verifyOtp }, } = dependencies;
    return {
        execute: async (data) => {
            console.log("data from usecse otp", data);
            return await verifyOtp(data);
        },
    };
};
exports.verifyOtpUseCase = verifyOtpUseCase;
