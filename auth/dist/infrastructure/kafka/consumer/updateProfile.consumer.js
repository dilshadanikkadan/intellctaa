"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileConsumer = void 0;
const updateProfile_1 = require("@/infrastructure/database/mongo/repositories/usesr/updateProfile");
const updateProfileConsumer = async (payload) => {
    try {
        await (0, updateProfile_1.updateProfile)(payload);
    }
    catch (error) {
    }
};
exports.updateProfileConsumer = updateProfileConsumer;
