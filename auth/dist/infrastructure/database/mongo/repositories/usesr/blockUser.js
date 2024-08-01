"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockUser = void 0;
const common_1 = require("@intellectaa/common");
const findEmail_1 = require("./findEmail");
const blockUser = async (payload) => {
    try {
        const { email } = payload;
        const user = await (0, findEmail_1.findEamil)(email);
        if (!user)
            throw new common_1.BadRequestError("user not found");
        user.isBlocked = !user.isBlocked;
        await user.save();
        console.log("**********************after updation", user);
    }
    catch (error) {
        console.log(error);
    }
};
exports.blockUser = blockUser;
