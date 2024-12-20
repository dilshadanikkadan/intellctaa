"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const signup_validation_1 = require("@/_lib/utils/services/validation/signup.validation");
const controllers_1 = require("@/presentation/controllers");
const common_1 = require("@intellectaa/common");
const express_1 = require("express");
const routes = (dependencies) => {
    const { creatUser, blockUser, getAllUsers, instructorCreate, updateProfile, getAllInstructor, userStatics, instructorStatics, } = (0, controllers_1.controllers)(dependencies);
    const router = (0, express_1.Router)();
    router.post("/signup", signup_validation_1.validateSignUP, common_1.validateRequest, creatUser);
    router.put("/ ", blockUser);
    router.get("/getAllUsers", common_1.requireAdmin, getAllUsers);
    router.get("/getAllInstructor", common_1.requireAdmin, getAllInstructor);
    router.get("/userStatics", userStatics);
    router.get("/instructorStatics", instructorStatics);
    router.put("/createInstructor", common_1.requireUser, instructorCreate);
    router.put("/updateProfile", common_1.requireUser, updateProfile);
    return router;
};
exports.routes = routes;
