"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const verifyToken_1 = require("@/_lib/utils/services/token/verifyToken");
const common_1 = require("@intellectaa/common");
const findEmail_1 = require("./findEmail");
const resetPassword = async (payload) => {
    const { token, password } = payload;
    try {
        const verifiCation = (0, verifyToken_1.VerifyJwtToken)(token);
        const email = verifiCation.payload;
        const user = await (0, findEmail_1.findEamil)(email);
        if (!user) {
            throw new common_1.BadRequestError("No User Found With Provided Email");
        }
        user.password = password;
        await user.save();
        return user;
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new common_1.BadRequestError("Token Expired");
        }
        throw new common_1.BadRequestError("token is not valid");
    }
};
exports.resetPassword = resetPassword;
