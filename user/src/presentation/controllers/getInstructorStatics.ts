import { IDependencies } from "@/application/interfaces/IDependencies";


export const instructorStaticsController = (dependencies: IDependencies) => {
  const {
    useCases: { instructorStaticsUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const savedUser = await instructorStaticsUseCase(dependencies).execute(req.body);
  
      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  }; 
}; 
