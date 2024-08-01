"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const generateAccessToken_1 = require("@/_lib/utils/services/token/generateAccessToken");
const loginController = (dependencies) => {
    const { useCases: { loginUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const user = await loginUseCase(dependencies).execute(req.body);
            const token = await (0, generateAccessToken_1.generateAccessToken)({
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isInstructor: user?.isInstructor,
            });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.cookie("session_id", user._id, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });
            res.status(200).json(user);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.loginController = loginController;
