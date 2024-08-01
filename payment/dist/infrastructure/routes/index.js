"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const signup_validation_1 = require("@/_lib/utils/services/validation/signup.validation");
const controllers_1 = require("@/presentation/controllers");
const common_1 = require("@intellectaa/common");
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const routes = (dependencies) => {
    const { creatUser, createSession, webHook } = (0, controllers_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.post("/signup", signup_validation_1.validateSignUP, common_1.validateRequest, creatUser);
    router.post("/stripeSession", createSession);
    router.post("/webhook", express_2.default.raw({ type: "application/json" }), webHook);
    return router;
};
exports.routes = routes;
