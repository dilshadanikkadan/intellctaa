"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorStaticsController = void 0;
const instructorStaticsController = (dependencies) => {
    const { useCases: { instructorStaticsUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const savedUser = await instructorStaticsUseCase(dependencies).execute(req.body);
            res.status(200).json(savedUser);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.instructorStaticsController = instructorStaticsController;
