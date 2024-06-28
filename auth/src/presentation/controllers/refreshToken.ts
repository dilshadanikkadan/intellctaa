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
      if (!userId) throw new NotAuthorizedError();
        console.log("===============================================");
        console.log(req.cookies);
        console.log("===============================================");
        
      const newAccessToken = await refreshTokenUseCase(dependencies).execute({
        ...req.body,
        userId,
      });
      res.cookie("token", newAccessToken, {
        httpOnly: true,
        secure:false,
        sameSite: "strict",
      });
      res.status(200).json(newAccessToken);
    } catch (error) {
      next(error);
    }
  };
};
