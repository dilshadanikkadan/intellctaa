"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = void 0;
const logoutController = (dependencies) => {
    const { useCases: { logoutUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const response = await logoutUseCase(dependencies).execute(req.body);
            res.clearCookie("token");
            res.clearCookie("session_id");
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.logoutController = logoutController;
