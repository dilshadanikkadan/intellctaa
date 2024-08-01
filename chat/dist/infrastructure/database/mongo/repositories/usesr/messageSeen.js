"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageSeen = void 0;
const Message_1 = require("../../models/Message");
const messageSeen = async (roomId) => {
    try {
        const msg = await Message_1.MessageModel.updateMany({ roomId }, { $set: { read: true } });
        return msg;
    }
    catch (error) {
    }
};
exports.messageSeen = messageSeen;
