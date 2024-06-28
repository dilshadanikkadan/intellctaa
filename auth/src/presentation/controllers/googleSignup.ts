import {
  generateAccessToken,
  generateRefreshToken,
} from "@/_lib/utils/services/token/generateAccessToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { User } from "@/infrastructure/database/mongo/models/User";
import userCreated, {
  UserSavedBatch,
} from "@/infrastructure/kafka/producer/userCreated";
import { Request, Response } from "express";

export const googleSignUpController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase, googleLoginUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next) => {
    try {
      const { email, given_name, mode }: any = req.body;

      const userExist = await User.findOne({ email });

      let user;
      if (userExist) {
        user = googleLoginUseCase(dependencies).execute({
          email,
          username: given_name,
          password: "vbnmmmmN",
          mode,
        });
      } else {
        user = await createUserUseCase(dependencies).execute({
          email,
          username: given_name,
          password: "vbnmmmmN",
        });
      }
      const token = generateAccessToken({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
      });

      const refreshToken = generateRefreshToken({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
      });

      await User.findByIdAndUpdate(user._id, {
        $set: { isAuth: true, refreshToken, otp: "null", isVerified: true },
      });
      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "none",
      });
      res.cookie("session_id", user._id, {
        httpOnly: false,
        secure: false,
        sameSite: "none",
      });

      userCreated.produceAll({ payload: user }, UserSavedBatch(user));

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};
