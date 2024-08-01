"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const User_1 = require("../../models/User");
const deleteUser = async (email) => {
    try {
        const emailDelete = User_1.User.findOneAndDelete({ email });
        return emailDelete;
    }
    catch (error) { }
};
exports.deleteUser = deleteUser;
