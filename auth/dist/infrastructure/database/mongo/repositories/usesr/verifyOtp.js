"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = void 0;
const common_1 = require("@intellectaa/common");
const findEmail_1 = require("./findEmail");
const ms_1 = __importDefault(require("ms"));
const generateAccessToken_1 = require("@/_lib/utils/services/token/generateAccessToken");
const verifyOtp = async (payload) => {
    const { email, otp } = payload;
    const user = await (0, findEmail_1.findEamil)(email);
    if (!user)
        throw new common_1.BadRequestError("Email does not Exits!!");
    console.log(otp);
    if (otp !== user.otp)
        throw new common_1.BadRequestError("Otp verification Failed!!");
    const currentTime = Date.now();
    const otpExpirationTime = Number(user?.otpExp ?? 0);
    const expTime = (0, ms_1.default)("60s");
    if (currentTime - otpExpirationTime > expTime) {
        throw new common_1.BadRequestError("OTP has expired");
    }
    // setting the verification
    user.isVerified = true;
    await user.save();
    const refreshToken = (0, generateAccessToken_1.generateRefreshToken)({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
    });
    user.refreshToken = refreshToken;
    await user.save();
    return user;
};
exports.verifyOtp = verifyOtp;
