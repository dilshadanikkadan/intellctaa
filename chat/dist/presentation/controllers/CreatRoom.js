"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomController = void 0;
const createRoomController = (dependencies) => {
    const { useCases: { createRoomUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const response = await createRoomUseCase(dependencies).execute(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.createRoomController = createRoomController;
