"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBlockConsumer = void 0;
const blockUser_1 = require("@/infrastructure/database/mongo/repositories/usesr/blockUser");
const userBlockConsumer = async (payload) => {
    try {
        await (0, blockUser_1.blockUser)(payload);
    }
    catch (error) {
    }
};
exports.userBlockConsumer = userBlockConsumer;
