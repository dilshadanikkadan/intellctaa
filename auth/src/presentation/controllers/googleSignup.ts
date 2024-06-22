import {
  generateAccessToken,
} from "@/_lib/utils/services/token/generateAccessToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response } from "express";

export const googleSignUpController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase },
  } = dependencies;
  return async (req: Request, res:Response, next) => {
    try {
      const { email, given_name }: any = req.body;
      const user = await createUserUseCase(dependencies).execute({
        email,
        username: given_name,
        password: "vbnmmmmN",
      });

      const token = generateAccessToken({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
      });

    //   const refreshToken = generateRefreshToken({
    //     id: user._id,
    //     email: user.email,
    //     isAdmin: user.isAdmin,
    //     isInstructor: user?.isInstructor,
    //   });
    //   user.refreshToken = refreshToken;
    //   await user.save();
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

      
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};
