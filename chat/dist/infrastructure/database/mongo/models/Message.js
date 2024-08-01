"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    roomId: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    deleteForMe: {
        type: Boolean,
        default: false,
    },
    message: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    description: {
        type: String,
    },
    replyTo: {
        type: String,
    },
    pinned: {
        type: Boolean,
        default: false,
    },
    replyMessage: {
        type: String,
    },
    typeMessage: {
        type: String,
        enum: ["text", "image", "audio", "video", "file", "reply"],
        default: "text",
    },
    read: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.MessageModel = (0, mongoose_1.model)("messages", messageSchema);
