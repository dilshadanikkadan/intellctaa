import { IDependencies } from "@/application/interfaces/IDependencies";
import {Request} from 'express'
export const getMYMessagesController = (dependencies: IDependencies) => {
  const {
    useCases: { getMyMessagesUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
        const {id} = req.params
      const response = await getMyMessagesUseCase(dependencies).execute(id);
     
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }; 
}; 
