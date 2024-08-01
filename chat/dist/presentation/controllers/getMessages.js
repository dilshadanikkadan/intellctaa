"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessagesController = void 0;
const getMessagesController = (dependencies) => {
    const { useCases: { getMessagesUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await getMessagesUseCase(dependencies).execute(id);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.getMessagesController = getMessagesController;
