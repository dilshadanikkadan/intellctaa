"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStaticsController = void 0;
const userStaticsController = (dependencies) => {
    const { useCases: { userStaticsUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const savedUser = await userStaticsUseCase(dependencies).execute(req.body);
            res.status(200).json(savedUser);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.userStaticsController = userStaticsController;
