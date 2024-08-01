"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = void 0;
const User_1 = require("../../models/User");
const updateProfile = async (payload) => {
    const { userId, ...rest } = payload;
    const updatedUser = await User_1.User.findByIdAndUpdate(userId, {
        $set: {
            ...rest
        }
    }, { new: true });
    return updatedUser;
};
exports.updateProfile = updateProfile;
