"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["student", "instructor", "admin"],
        default: "student",
    },
    email: {
        type: String,
        required: true,
        // unique: true,
    },
    profile: {
        type: String,
    },
    contact: {
        additionalEmail: {
            type: String,
        },
        phone: {
            type: String,
        },
        socialMedia: {
            instagram: String,
            linkedIn: String,
            github: String,
        },
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAuth: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isInstructor: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profession: {
        type: String,
    },
    otp: {
        type: String,
    },
    otpExp: {
        type: Number,
    },
    refreshToken: {
        type: String,
    },
    profit: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
userSchema.statics.build = (attrs) => {
    return new exports.User(attrs);
};
exports.User = (0, mongoose_1.model)("users", userSchema);
