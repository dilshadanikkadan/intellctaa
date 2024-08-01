"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = void 0;
const User_1 = require("../../models/User");
const getAllUser = async (payload) => {
    const { _limit, _page } = payload;
    const limit = parseInt(_limit, 10) || 5;
    const pageNumber = parseInt(_page, 10) || 1;
    const skip = (pageNumber - 1) * limit;
    try {
        const allUsers = await User_1.User.find({ isAdmin: { $ne: true } })
            .skip(skip)
            .limit(limit);
        const totalCount = await User_1.User.countDocuments({ isAdmin: { $ne: true } });
        return {
            users: allUsers,
            totalCount: totalCount
        };
    }
    catch (error) {
    }
};
exports.getAllUser = getAllUser;
