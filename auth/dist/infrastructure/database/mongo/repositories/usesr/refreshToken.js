"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = void 0;
const common_1 = require("@intellectaa/common");
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/_boot/config");
const generateAccessToken_1 = require("@/_lib/utils/services/token/generateAccessToken");
const refreshToken = async (payload) => {
    console.log("paload refreshstoken");
    const { userId } = payload;
    const user = await User_1.User.findById(userId);
    console.log(user);
    if (!user || !user.refreshToken) {
        throw new common_1.BadRequestError("Invalid user session");
    }
    jsonwebtoken_1.default.verify(user.refreshToken, config_1.config.secrets.refresh_token);
    const accessToken = await (0, generateAccessToken_1.generateAccessToken)({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
    });
    const refreshToken = await (0, generateAccessToken_1.generateRefreshToken)({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
    });
    user.refreshToken = refreshToken;
    await user.save();
    return accessToken;
};
exports.refreshToken = refreshToken;
