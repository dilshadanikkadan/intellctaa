"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = void 0;
const resetPasswordController = (dependencies) => {
    const { useCases: { resetPasswordUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const response = await resetPasswordUseCase(dependencies).execute(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            console.error(error);
            next(error);
        }
    };
};
exports.resetPasswordController = resetPasswordController;
