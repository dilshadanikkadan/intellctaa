"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserController = void 0;
const getAllUserController = (dependencies) => {
    const { useCases: { getAllUserUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const { _limit, _page } = req.query;
            const savedUser = await getAllUserUseCase(dependencies).execute({
                _limit,
                _page,
            });
            return res.status(200).json(savedUser);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.getAllUserController = getAllUserController;
