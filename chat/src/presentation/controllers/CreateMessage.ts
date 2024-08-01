import { IDependencies } from "@/application/interfaces/IDependencies";

export const createChatController = (dependencies: IDependencies) => {
  const {
    useCases: { createMessageUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const response = await createMessageUseCase(dependencies).execute(req.body);
     
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }; 
}; 
