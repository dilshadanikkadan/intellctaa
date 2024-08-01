"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoom = void 0;
const ChatRoom_1 = require("../../models/ChatRoom");
const createRoom = async (payload) => {
    const { partcipants, roomCreater, ...rest } = payload;
    const newRoom = new ChatRoom_1.ChatRoomSchema({
        partcipants: [...partcipants],
        roomCreater,
        ...rest
    });
    return await newRoom.save();
};
exports.createRoom = createRoom;
