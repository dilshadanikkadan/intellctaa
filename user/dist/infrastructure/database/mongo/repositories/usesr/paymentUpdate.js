"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pyamentUpdate = void 0;
const User_1 = require("../../models/User");
const pyamentUpdate = async (payload) => {
    const { instructor, amount } = payload;
    try {
        const adminFund = (amount * 20) / 100;
        const instructorFund = (amount * 80) / 100;
        await User_1.User.findOneAndUpdate({ isAdmin: true }, {
            $inc: { profit: Math.ceil(adminFund) },
        }, { new: true });
        await User_1.User.findByIdAndUpdate(instructor, {
            $inc: { profit: Math.ceil(instructorFund) },
        }, { new: true });
    }
    catch (error) { }
};
exports.pyamentUpdate = pyamentUpdate;
