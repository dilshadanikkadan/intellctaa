import { Schema, model } from "mongoose";
import { UserEntity } from "@/domain/entities";
// import { Password } from "@_lib/utils/services/password/password.service";
import { Password } from "../../../../_lib/utils/services/password/password.service";

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
    password: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
userSchema.statics.build = (attrs: UserEntity) => {
  return new User(attrs);
};

export const User = model<UserEntity>("users", userSchema);
