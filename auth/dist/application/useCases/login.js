"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUseCase = void 0;
const findEmail_1 = require("@/infrastructure/database/mongo/repositories/usesr/findEmail");
const common_1 = require("@intellectaa/common");
const password_service_1 = require("@/_lib/utils/services/password/password.service");
const generateAccessToken_1 = require("@/_lib/utils/services/token/generateAccessToken");
const loginUseCase = (dependencies) => {
    const { repositories: {}, } = dependencies;
    return {
        execute: async (data) => {
            const { email, password } = data;
            const user = await (0, findEmail_1.findEamil)(email);
            if (!user)
                throw new common_1.BadRequestError("User not exist");
            if (user.isAdmin) {
                const refreshToken = await (0, generateAccessToken_1.generateRefreshToken)({
                    id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isInstructor: user?.isInstructor,
                });
                user.refreshToken = refreshToken;
                await user.save();
                return user;
            }
            if (user.isAuth)
                throw new common_1.BadRequestError("User have already google acc");
            if (user.isBlocked)
                throw new common_1.BadRequestError("You have been bloacked");
            const isMatch = await password_service_1.Password.compare(user.password, password);
            if (!isMatch)
                throw new common_1.BadRequestError("Incorrect password");
            const refreshToken = await (0, generateAccessToken_1.generateRefreshToken)({
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isInstructor: user?.isInstructor,
            });
            user.refreshToken = refreshToken;
            await user.save();
            return user;
        },
    };
};
exports.loginUseCase = loginUseCase;
