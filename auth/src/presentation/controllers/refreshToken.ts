import { IDependencies } from "@/application/interfaces/IDependencies";
import { NotAuthorizedError } from "@intellectaa/common";
import { Request, Response } from "express";

export const refreshTokenController = (dependencies: IDependencies) => {
  const {
    useCases: { refreshTokenUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next) => {
    try {
      const userId = req.cookies.session_id;
      console.log("===============================================");
      console.log(!userId);
      console.log("===============================================");

      if (!userId) {
        console.log("entered");

        throw new NotAuthorizedError();
      }

      const newAccessToken = await refreshTokenUseCase(dependencies).execute({
        ...req.body,
        userId,
      });
      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      res.status(200).json(newAccessToken);
    } catch (error) {
      next(error);
    }
  };
};
