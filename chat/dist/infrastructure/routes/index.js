"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const signup_validation_1 = require("@/_lib/utils/services/validation/signup.validation");
const controllers_1 = require("@/presentation/controllers");
const common_1 = require("@intellectaa/common");
const express_1 = require("express");
const routes = (dependencies) => {
    const { creatUser, createRoom, createChat, getMessages, getMyMessages } = (0, controllers_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.post("/signup", signup_validation_1.validateSignUP, common_1.validateRequest, creatUser);
    router.post("/createChatRoom", common_1.requireUser, createRoom);
    router.post("/createMessage", common_1.requireUser, createChat);
    router.get("/getMessages/:id", common_1.requireUser, getMessages);
    router.get("/getMyMessages/:id", common_1.requireUser, getMyMessages);
    return router;
};
exports.routes = routes;
