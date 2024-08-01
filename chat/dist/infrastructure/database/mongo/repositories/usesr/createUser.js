"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_1 = require("../../models/User");
const createUser = async (payload) => {
    console.log("_______%%%%from create user");
    const newUser = new User_1.User({
        ...payload,
    });
    return await newUser.save();
};
exports.createUser = createUser;
