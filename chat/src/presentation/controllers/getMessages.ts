import { IDependencies } from "@/application/interfaces/IDependencies";
import {Request} from 'express'
export const getMessagesController = (dependencies: IDependencies) => {
  const {
    useCases: { getMessagesUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
        const {id} = req.params
      const response = await getMessagesUseCase(dependencies).execute(id);
     
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }; 
}; 
