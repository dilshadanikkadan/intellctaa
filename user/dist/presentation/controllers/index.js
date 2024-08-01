"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const createUser_1 = require("./createUser");
const blockUser_1 = require("./blockUser");
const getAllUsers_1 = require("./getAllUsers");
const instructorCreate_1 = require("./instructorCreate");
const updateProfile_1 = require("./updateProfile");
const getAllInstructor_1 = require("./getAllInstructor");
const getUserStatics_1 = require("./getUserStatics");
const getInstructorStatics_1 = require("./getInstructorStatics");
const controllers = (dependencies) => {
    return {
        creatUser: (0, createUser_1.createUserController)(dependencies),
        blockUser: (0, blockUser_1.blockController)(dependencies),
        getAllUsers: (0, getAllUsers_1.getAllUserController)(dependencies),
        instructorCreate: (0, instructorCreate_1.instructorCreateController)(dependencies),
        updateProfile: (0, updateProfile_1.updateProfileController)(dependencies),
        getAllInstructor: (0, getAllInstructor_1.getAllInstructorController)(dependencies),
        userStatics: (0, getUserStatics_1.userStaticsController)(dependencies),
        instructorStatics: (0, getInstructorStatics_1.instructorStaticsController)(dependencies),
    };
};
exports.controllers = controllers;
