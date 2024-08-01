"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    courseMode: {
        type: String,
        enum: ["premium", "basic"],
    },
    method: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
    },
    amount: {
        type: Number,
    },
}, {
    timestamps: true,
});
exports.Payment = (0, mongoose_1.model)("payments", PaymentSchema);
