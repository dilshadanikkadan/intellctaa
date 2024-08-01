"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserController = void 0;
const currentUser_1 = require("@/infrastructure/database/mongo/repositories/usesr/currentUser");
const currentUserController = (dependencies) => {
    return async (req, res, next) => {
        try {
            const response = await (0, currentUser_1.currentUser)(req.body);
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.currentUserController = currentUserController;
