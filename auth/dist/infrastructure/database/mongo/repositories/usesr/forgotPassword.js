"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = void 0;
const common_1 = require("@intellectaa/common");
const findEmail_1 = require("./findEmail");
const generateAccessToken_1 = require("@/_lib/utils/services/token/generateAccessToken");
const forgotPassword = async (payload) => {
    const { email } = payload;
    const user = await (0, findEmail_1.findEamil)(email);
    if (!user) {
        throw new common_1.BadRequestError("Email Do Not Exist");
    }
    const token = (0, generateAccessToken_1.generateForgotPasswordToken)(email);
    return {
        email,
        token,
    };
};
exports.forgotPassword = forgotPassword;
