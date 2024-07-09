import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request } from "express";
export const getAllUserController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllUserUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
       const {_limit,_page}:any=  req.query
      const savedUser = await getAllUserUseCase(dependencies).execute({
        _limit,_page
      });
     
      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  }; 
}; 
