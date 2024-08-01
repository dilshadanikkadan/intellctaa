"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomSchema = void 0;
const mongoose_1 = require("mongoose");
const chatRoomSchema = new mongoose_1.Schema({
    roomCreater: {
        type: String,
    },
    roomName: {
        type: String,
    },
    roomProfile: {
        type: String,
    },
    partcipants: [],
    lastMessage: {
        type: mongoose_1.Schema.Types.Mixed,
    },
    unReadMessage: {
        type: Array,
        default: []
    },
    read: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ChatRoomSchema = (0, mongoose_1.model)("chat", chatRoomSchema);
