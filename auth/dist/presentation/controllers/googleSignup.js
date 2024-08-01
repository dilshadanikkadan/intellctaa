"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignUpController = void 0;
const google_auth_library_1 = require("google-auth-library");
const config_1 = require("@/_boot/config");
const generateAccessToken_1 = require("@/_lib/utils/services/token/generateAccessToken");
const client = new google_auth_library_1.OAuth2Client(config_1.config.secrets.google_cleint_id);
const googleSignUpController = (dependencies) => {
    const { useCases: { googleLoginUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const { credential } = req.body;
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const { email, name, picture } = payload;
            const user = await googleLoginUseCase(dependencies).execute({
                email,
                name,
                picture,
            });
            const token = await (0, generateAccessToken_1.generateAccessToken)({
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isInstructor: user?.isInstructor,
            });
            const refreshToken = (0, generateAccessToken_1.generateRefreshToken)({
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isInstructor: user?.isInstructor,
            });
            user.refreshToken = refreshToken;
            await user.save();
            res.cookie("token", token, { httpOnly: true });
            res.cookie("session_id", user?._id, { httpOnly: true });
            return res.json(user);
            console.log(user);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.googleSignUpController = googleSignUpController;
