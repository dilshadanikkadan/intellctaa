import { IDependencies } from "@/application/interfaces/IDependencies";

export const createRoomController = (dependencies: IDependencies) => {
  const {
    useCases: { createRoomUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const response = await createRoomUseCase(dependencies).execute(req.body);
     
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }; 
}; 
