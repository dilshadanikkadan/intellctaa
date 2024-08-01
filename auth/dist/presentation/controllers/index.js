"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createUser_1 = require("./createUser");
const verifyOtp_1 = require("./verifyOtp");
const refreshToken_1 = require("./refreshToken");
const logout_1 = require("./logout");
const googleSignup_1 = require("./googleSignup");
const resentOtp_1 = require("./resentOtp");
const forgotPassword_1 = require("./forgotPassword");
const resetPassword_1 = require("./resetPassword");
const login_1 = require("./login");
const currentUser_1 = require("./currentUser");
const controllers = (dependencies) => {
    return {
        creatUser: (0, createUser_1.createUserController)(dependencies),
        verifyOtp: (0, verifyOtp_1.verifyOtpController)(dependencies),
        refreshToken: (0, refreshToken_1.refreshTokenController)(dependencies),
        logout: (0, logout_1.logoutController)(dependencies),
        googleAuth: (0, googleSignup_1.googleSignUpController)(dependencies),
        resentOtp: (0, resentOtp_1.resentOtpController)(dependencies),
        forgotPassword: (0, forgotPassword_1.forgotPasswordController)(dependencies),
        resetPassword: (0, resetPassword_1.resetPasswordController)(dependencies),
        login: (0, login_1.loginController)(dependencies),
        currentUser: (0, currentUser_1.currentUserController)(dependencies)
    };
};
exports.controllers = controllers;
