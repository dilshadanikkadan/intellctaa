"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorCreate = void 0;
const common_1 = require("@intellectaa/common");
const findEmail_1 = require("./findEmail");
const instructorCreate = async (payload) => {
    try {
        const { email } = payload;
        const user = await (0, findEmail_1.findEamil)(email);
        if (!user)
            throw new common_1.BadRequestError("user not found");
        user.isInstructor = true;
        await user.save();
        console.log("**********************after updation", user);
    }
    catch (error) {
        console.log(error);
    }
};
exports.instructorCreate = instructorCreate;
