"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenController = void 0;
const common_1 = require("@intellectaa/common");
const refreshTokenController = (dependencies) => {
    const { useCases: { refreshTokenUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const userId = req.cookies.session_id;
            console.log("===============================================");
            console.log(!userId);
            console.log("===============================================");
            if (!userId) {
                console.log("entered");
                throw new common_1.NotAuthorizedError();
            }
            const newAccessToken = await refreshTokenUseCase(dependencies).execute({
                ...req.body,
                userId,
            });
            res.cookie("token", newAccessToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
            });
            res.status(200).json(newAccessToken);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.refreshTokenController = refreshTokenController;
