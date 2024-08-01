"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webHook = void 0;
const Payment_1 = require("../../models/Payment");
const Session_1 = require("../../models/Session");
const webHook = async (payload) => {
    const { id } = payload;
    const session = await Session_1.Session.findOne({ sessionId: id });
    const newPayment = new Payment_1.Payment({
        userId: session?.userId,
        amount: session?.amount,
        courseId: session?.courseId,
        courseMode: session?.courseMode,
        status: "completed"
    });
    return await newPayment.save();
};
exports.webHook = webHook;
