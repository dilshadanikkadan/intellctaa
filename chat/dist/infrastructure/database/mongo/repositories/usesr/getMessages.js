"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = void 0;
const Message_1 = require("../../models/Message");
const getMessages = async (roomId) => {
    const response = await Message_1.MessageModel.find({ roomId });
    return response;
};
exports.getMessages = getMessages;
