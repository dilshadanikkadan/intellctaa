"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEamil = void 0;
const User_1 = require("../../models/User");
const findEamil = async (email) => {
    try {
        const emaiExist = User_1.User.findOne({ email });
        return emaiExist;
    }
    catch (error) { }
};
exports.findEamil = findEamil;
