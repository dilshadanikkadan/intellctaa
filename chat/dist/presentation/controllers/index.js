"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createUser_1 = require("./createUser");
const CreatRoom_1 = require("./CreatRoom");
const CreateMessage_1 = require("./CreateMessage");
const getMessages_1 = require("./getMessages");
const getMyMessages_1 = require("./getMyMessages");
const controllers = (dependencies) => {
    return {
        creatUser: (0, createUser_1.createUserController)(dependencies),
        createRoom: (0, CreatRoom_1.createRoomController)(dependencies),
        createChat: (0, CreateMessage_1.createChatController)(dependencies),
        getMessages: (0, getMessages_1.getMessagesController)(dependencies),
        getMyMessages: (0, getMyMessages_1.getMYMessagesController)(dependencies),
    };
};
exports.controllers = controllers;
