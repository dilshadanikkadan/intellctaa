"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatics = void 0;
const User_1 = require("../../models/User");
const userStatics = async (payload) => {
    const date = new Date();
    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const previousMonth = new Date(lastMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const data = await User_1.User.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: previousMonth,
                },
            },
        },
        {
            $group: {
                _id: { $month: "$createdAt" },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                count: 1,
            },
        },
    ]);
    return data;
};
exports.userStatics = userStatics;
