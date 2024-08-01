"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatController = void 0;
const createChatController = (dependencies) => {
    const { useCases: { createMessageUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const response = await createMessageUseCase(dependencies).execute(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.createChatController = createChatController;
