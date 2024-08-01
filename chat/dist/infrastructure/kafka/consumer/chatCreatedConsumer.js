"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCreatedConsumer = void 0;
const usesr_1 = require("@/infrastructure/database/mongo/repositories/usesr");
const chatCreatedConsumer = async (payload) => {
    try {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", payload);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        await (0, usesr_1.createRoom)(payload);
    }
    catch (error) {
        console.log(error);
    }
};
exports.chatCreatedConsumer = chatCreatedConsumer;
