"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockController = void 0;
const generateAccessToken_1 = require("@/_lib/utils/services/token/generateAccessToken");
const userCreated_1 = __importStar(require("@/infrastructure/kafka/producer/userCreated"));
const blockController = (dependencies) => {
    const { useCases: { blockUseCase }, } = dependencies;
    return async (req, res, next) => {
        try {
            const savedUser = await blockUseCase(dependencies).execute(req.body);
            userCreated_1.default.produceAll({ payload: savedUser }, (0, userCreated_1.UserBlockBatch)(savedUser));
            const token = await (0, generateAccessToken_1.generateAccessToken)({
                id: savedUser._id,
                email: savedUser.email,
                isAdmin: savedUser.isAdmin,
                isInstructor: savedUser?.isInstructor,
                isBlocked: true,
            });
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            console.log(token);
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 3600000,
            });
            res.status(200).json(savedUser);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.blockController = blockController;
