"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUser = void 0;
const common_1 = require("@intellectaa/common");
const User_1 = require("../../models/User");
const blockUser = async (payload) => {
    const { email } = payload;
    const user = await User_1.User.findOne({ email });
    console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    console.log(user);
    if (!user) {
        throw new common_1.BadRequestError("User not found");
    }
    const updatedUser = await User_1.User.findOneAndUpdate({ email }, { $set: { isBlocked: !user.isBlocked } }, { new: true });
    return updatedUser;
};
exports.blockUser = blockUser;
