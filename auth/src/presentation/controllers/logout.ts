import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response } from "express";

export const logoutController = (dependencies: IDependencies) => {
  const {
    useCases: { logoutUseCase },
  } = dependencies;
  return async (req: Request, res:Response, next) => {
    try {
      const response = await logoutUseCase(dependencies).execute(req.body);
      res.clearCookie("token")
      res.clearCookie("session_id")
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
};
