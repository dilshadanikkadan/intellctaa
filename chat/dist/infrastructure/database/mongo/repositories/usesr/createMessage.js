"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = void 0;
const Message_1 = require("../../models/Message");
const createMessage = async (payload) => {
    const newMessage = new Message_1.MessageModel({
        ...payload
    });
    return await newMessage.save();
};
exports.createMessage = createMessage;
