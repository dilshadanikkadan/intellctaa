"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_1 = require("../../models/User");
const otp_service_1 = require("@/_lib/utils/services/otp/otp.service");
const findEmail_1 = require("./findEmail");
const common_1 = require("@intellectaa/common");
const deleteDoc_1 = require("./deleteDoc");
const createUser = async (payload) => {
    console.log(payload);
    const { password, email, ...rest } = payload;
    const user = await (0, findEmail_1.findEamil)(email);
    if (!user?.isVerified) {
        await (0, deleteDoc_1.deleteUser)(email);
    }
    if (user?.isVerified) {
        throw new common_1.BadRequestError("Email Aleady Exist");
    }
    const otp = (0, otp_service_1.generateOTP)();
    const newUser = new User_1.User({
        ...rest,
        email,
        otp,
        otpExp: Date.now(),
        password,
    });
    return await newUser.save();
};
exports.createUser = createUser;
