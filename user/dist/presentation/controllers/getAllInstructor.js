"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInstructorController = void 0;
const getAllInstructorController = (dependencies) => {
    const { useCases: { getAllInstructorUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const { _limit, _page } = req.query;
            const allInstructor = await getAllInstructorUseCase(dependencies).execute({
                _limit,
                _page,
            });
            res.status(200).json(allInstructor);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.getAllInstructorController = getAllInstructorController;
