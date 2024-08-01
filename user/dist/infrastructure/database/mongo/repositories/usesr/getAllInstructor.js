"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInstructor = void 0;
const User_1 = require("../../models/User");
const getAllInstructor = async (payload) => {
    const { _limit, _page } = payload;
    const limit = parseInt(_limit, 10) || 5;
    const pageNumber = parseInt(_page, 10) || 1;
    const skip = (pageNumber - 1) * limit;
    const allInstructors = await User_1.User.find({ isInstructor: true })
        .skip(skip)
        .limit(limit);
    const totalCount = (await User_1.User.find({ isInstructor: true })).length;
    return {
        users: allInstructors,
        totalCount: totalCount,
    };
};
exports.getAllInstructor = getAllInstructor;
