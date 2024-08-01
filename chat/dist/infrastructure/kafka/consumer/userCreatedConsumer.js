"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreatedConsumer = void 0;
const usesr_1 = require("@/infrastructure/database/mongo/repositories/usesr");
const userCreatedConsumer = async (payload) => {
    try {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", payload);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        await (0, usesr_1.createUser)(payload);
    }
    catch (error) {
        console.log(error);
    }
};
exports.userCreatedConsumer = userCreatedConsumer;
