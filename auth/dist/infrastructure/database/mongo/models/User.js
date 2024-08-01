"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const password_service_1 = require("../../../../_lib/utils/services/password/password.service");
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
    password: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        default: '/avt.png'
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
    isInstructor: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAuth: {
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
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        },
    },
});
userSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await password_service_1.Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
    done();
});
userSchema.statics.build = (attrs) => {
    return new exports.User(attrs);
};
exports.User = (0, mongoose_1.model)("users", userSchema);
