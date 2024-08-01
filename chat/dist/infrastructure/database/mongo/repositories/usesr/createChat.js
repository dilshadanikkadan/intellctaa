"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChat = void 0;
const ChatRoom_1 = require("../../models/ChatRoom");
const createChat = async (payload) => {
    const { userId, instructor } = payload;
    const newRoom = new ChatRoom_1.ChatRoomSchema({
        partcipants: [userId, instructor],
        roomCreater: instructor,
        lastMessage: "",
    });
    return await newRoom.save();
};
exports.createChat = createChat;
