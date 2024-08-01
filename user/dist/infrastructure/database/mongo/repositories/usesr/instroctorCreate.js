"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instructorCreate = void 0;
const common_1 = require("@intellectaa/common");
const findEmail_1 = require("./findEmail");
const instructorCreate = async (payload) => {
    console.log(payload);
    const { email, firstName, lastName } = payload;
    const user = await (0, findEmail_1.findEamil)(email);
    if (!user)
        throw new common_1.BadRequestError('User is not Found');
    user.firstName = firstName;
    user.lastName = lastName;
    user.isInstructor = true;
    user.role = "instructor";
    await user.save();
    return user;
};
exports.instructorCreate = instructorCreate;
