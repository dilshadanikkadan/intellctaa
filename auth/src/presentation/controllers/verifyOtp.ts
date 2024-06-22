import { generateAccessToken } from "@/_lib/utils/services/token/generateAccessToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response } from "express";

export const verifyOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { verifyOtpUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next) => { 
    try {
      const user = await verifyOtpUseCase(dependencies).execute(req.body);
      const token = generateAccessToken({
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

      res.status(200).json({
        success: {
          ...user._doc,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  };
};
