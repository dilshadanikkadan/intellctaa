"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newJoinRoom = void 0;
const joinToGroup_1 = require("@/infrastructure/database/mongo/repositories/usesr/joinToGroup");
const newJoinRoom = async (payload) => {
    try {
        await (0, joinToGroup_1.joinToGroup)(payload);
    }
    catch (error) { }
};
exports.newJoinRoom = newJoinRoom;
