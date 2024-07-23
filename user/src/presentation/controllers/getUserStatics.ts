import { IDependencies } from "@/application/interfaces/IDependencies";


export const userStaticsController = (dependencies: IDependencies) => {
  const {
    useCases: { userStaticsUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const savedUser = await userStaticsUseCase(dependencies).execute(req.body);
  
      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  }; 
}; 
