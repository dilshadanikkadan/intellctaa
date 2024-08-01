"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateForgotPasswordToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const config_1 = require("@/_boot/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jose_1 = require("jose");
// export const generateAccessToken = (payload: UserPayload) => {
//   return jwt.sign(payload, config.secrets.access_token,{expiresIn:'15m'});
// };
const JWT_SECRET = new TextEncoder().encode(config_1.config.secrets.access_token);
const generateAccessToken = async (payload) => {
    const token = await new jose_1.SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30m")
        .sign(JWT_SECRET);
    return token;
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.config.secrets.access_token, { expiresIn: '30m' });
};
exports.generateRefreshToken = generateRefreshToken;
const generateForgotPasswordToken = (payload) => {
    return jsonwebtoken_1.default.sign({ payload }, config_1.config.secrets.access_token, { expiresIn: '30m' });
};
exports.generateForgotPasswordToken = generateForgotPasswordToken;
