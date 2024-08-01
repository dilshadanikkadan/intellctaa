"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMYMessagesController = void 0;
const getMYMessagesController = (dependencies) => {
    const { useCases: { getMyMessagesUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await getMyMessagesUseCase(dependencies).execute(id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.getMYMessagesController = getMYMessagesController;
