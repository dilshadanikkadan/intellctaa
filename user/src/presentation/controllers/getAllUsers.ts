import { IDependencies } from "@/application/interfaces/IDependencies";
export const getAllUserController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllUserUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const savedUser = await getAllUserUseCase(dependencies).execute(req.body);
     
      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  }; 
}; 
