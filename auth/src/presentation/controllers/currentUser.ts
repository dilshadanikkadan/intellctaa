import { IDependencies } from "@/application/interfaces/IDependencies";
import { currentUser } from "@/infrastructure/database/mongo/repositories/usesr/currentUser";
import { Request, Response ,NextFunction} from "express";

export const currentUserController = (dependencies: IDependencies) => {

  return async (req: Request, res:Response, next:NextFunction) => {
    try {
      const response = await currentUser(req.body)
      res.status(200).json(response);
    } catch (error) {
      next(error);
    } 
  }; 
};
