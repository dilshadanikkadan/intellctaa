import { IDependencies } from "@/application/interfaces/IDependencies";

export const getAllInstructorController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllInstructorUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const allInstructor = await getAllInstructorUseCase(dependencies).execute(req.body);
  
      res.status(200).json(allInstructor);
    } catch (error) {
      next(error);
    }
  }; 
}; 
