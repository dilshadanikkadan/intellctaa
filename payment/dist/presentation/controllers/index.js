"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createUser_1 = require("./createUser");
const stripeSession_1 = require("./stripeSession");
const webhook_1 = require("./webhook");
const controllers = (dependencies) => {
    return {
        creatUser: (0, createUser_1.createUserController)(dependencies),
        createSession: (0, stripeSession_1.stripeSessionController)(dependencies),
        webHook: (0, webhook_1.webhookController)(dependencies)
    };
};
exports.controllers = controllers;
