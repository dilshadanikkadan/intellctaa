"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pinMessage = void 0;
const Message_1 = require("../../models/Message");
const pinMessage = async (payload) => {
    //   const { messageId } = payload;
    try {
        const message = await Message_1.MessageModel.findByIdAndUpdate(payload, { $set: { pinned: true } }, { new: true });
        // console.log("message", message);
        return message;
    }
    catch (error) { }
};
exports.pinMessage = pinMessage;
