"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeSessionUseCase = void 0;
const stripeSessionUseCase = (dependencies) => {
    const { repositories: { stripeSession }, } = dependencies;
    return {
        execute: async (data) => {
            return await stripeSession(data);
        },
    };
};
exports.stripeSessionUseCase = stripeSessionUseCase;
