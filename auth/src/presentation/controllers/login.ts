import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request, Response } from "express";

export const loginController = (dependencies: IDependencies) => {
  const {
    useCases: { loginUseCase },
  } = dependencies;
  return async (req: Request, res:Response, next) => {
    try {
      const response = await loginUseCase(dependencies).execute(req.body);
   
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
};
