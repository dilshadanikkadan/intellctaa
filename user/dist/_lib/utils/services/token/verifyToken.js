"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyJwtToken = void 0;
const config_1 = require("@/_boot/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const VerifyJwtToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.config.secrets.access_token);
    }
    catch (error) {
        throw error;
    }
};
exports.VerifyJwtToken = VerifyJwtToken;
