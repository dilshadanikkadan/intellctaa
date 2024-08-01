"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinToGroup = void 0;
const ChatRoom_1 = require("../../models/ChatRoom");
const createChat_1 = require("./createChat");
const joinToGroup = async (payload) => {
    const { courseId, instructor, userId, amount } = payload;
    if (amount < 799) {
        return;
    }
    try {
        console.log("&&&&&&&", payload);
        const room = await ChatRoom_1.ChatRoomSchema.findOneAndUpdate({ roomCreater: courseId }, {
            $push: { partcipants: userId },
        }, {
            new: true,
        });
        await (0, createChat_1.createChat)({
            instructor,
            userId,
        });
        return room;
    }
    catch (error) {
        console.log(error);
    }
};
exports.joinToGroup = joinToGroup;
