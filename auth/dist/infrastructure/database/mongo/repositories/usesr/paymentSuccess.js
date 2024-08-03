"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pyamentUpdateAuth = void 0;
const User_1 = require("../../models/User");
const pyamentUpdateAuth = async (payload) => {
    console.log("paylodf from  pyamentUpdateAuth", payload);
    const { instructor, amount } = payload;
    try {
        const adminFund = (amount * 20) / 100;
        const instructorFund = (amount * 80) / 100;
        console.log("_______________");
        console.log("paylodf from  pyamentUpdateAuth", adminFund);
        console.log("paylodf from  pyamentUpdateAuth", instructorFund);
        console.log("_______________");
        const res = await User_1.User.findOneAndUpdate({ isAdmin: true }, {
            $inc: { profit: Math.ceil(adminFund) },
        }, { new: true });
        await User_1.User.findByIdAndUpdate(instructor, {
            $inc: { profit: Math.ceil(instructorFund) },
        }, { new: true });
    }
    catch (error) { }
};
exports.pyamentUpdateAuth = pyamentUpdateAuth;