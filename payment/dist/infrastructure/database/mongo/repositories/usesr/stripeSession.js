"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeSession = void 0;
const Session_1 = require("../../models/Session");
const stripeSession = async (payload) => {
    const { userId } = payload;
    const existUser = await Session_1.Session.findOne({ userId });
    if (existUser) {
        await Session_1.Session.findOneAndDelete({ userId });
    }
    const newSession = new Session_1.Session({
        ...payload,
    });
    return await newSession.save();
};
exports.stripeSession = stripeSession;
