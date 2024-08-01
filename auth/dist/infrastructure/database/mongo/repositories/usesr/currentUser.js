"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const common_1 = require("@intellectaa/common");
const findEmail_1 = require("./findEmail");
const currentUser = async (payload) => {
    const user = await (0, findEmail_1.findEamil)(payload.email);
    if (!user)
        throw new common_1.BadRequestError("User not Exist");
    return user;
};
exports.currentUser = currentUser;
