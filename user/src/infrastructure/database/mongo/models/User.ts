import { Schema, model } from "mongoose";
import { UserEntity } from "@/domain/entities";

const userSchema = new Schema(
  {
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
  },
  {
    timestamps: true,
    
  }
);


userSchema.statics.build = (attrs: UserEntity) => {
  return new User(attrs);
};

export const User = model<UserEntity>("users", userSchema);
