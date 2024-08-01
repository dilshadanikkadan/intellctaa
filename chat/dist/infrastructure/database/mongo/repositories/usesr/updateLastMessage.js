"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLastMessage = void 0;
const ChatRoom_1 = require("../../models/ChatRoom");
const updateLastMessage = async ({ roomId, message }) => {
    try {
        const msg = await ChatRoom_1.ChatRoomSchema.findByIdAndUpdate(roomId, {
            $set: { lastMessage: message }, $push: { unReadMessage: '.' },
        }, { new: true });
        return msg;
    }
    catch (error) { }
};
exports.updateLastMessage = updateLastMessage;
