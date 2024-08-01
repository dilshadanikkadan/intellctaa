"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInstructorConsumer = void 0;
const InstuctorCreate_1 = require("@/infrastructure/database/mongo/repositories/usesr/InstuctorCreate");
const userInstructorConsumer = async (payload) => {
    try {
        await (0, InstuctorCreate_1.instructorCreate)(payload);
    }
    catch (error) {
        console.log(error);
    }
};
exports.userInstructorConsumer = userInstructorConsumer;
