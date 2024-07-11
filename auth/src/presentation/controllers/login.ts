import { generateAccessToken } from "@/_lib/utils/services/token/generateAccessToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response } from "express";

export const loginController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next) => {
    try {
      const user = await loginUseCase(dependencies).execute(req.body);
      const token =await generateAccessToken({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
      });
    

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.cookie("session_id", user._id, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};
