"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUnReadMessage = void 0;
const ChatRoom_1 = require("../../models/ChatRoom");
const updateUnReadMessage = async (roomId) => {
    console.log("_______________________________");
    console.log(roomId);
    console.log("_______________________________");
    try {
        const msg = await ChatRoom_1.ChatRoomSchema.findByIdAndUpdate(roomId, {
            $set: { unReadMessage: [] }
        }, { new: true });
        return msg;
    }
    catch (error) { }
};
exports.updateUnReadMessage = updateUnReadMessage;
