"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const mongoose_1 = require("mongoose");
const sessionSchema = new mongoose_1.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    instructor: {
        type: String,
    },
    courseMode: {
        type: String,
    },
    amount: {
        type: Number,
    },
}, { timestamps: true });
exports.Session = (0, mongoose_1.model)("sessions", sessionSchema);
