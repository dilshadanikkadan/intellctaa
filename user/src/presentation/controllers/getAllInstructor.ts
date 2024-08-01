import { IDependencies } from "@/application/interfaces/IDependencies";
import { Request ,Response ,NextFunction} from "express";
export const getAllInstructorController = (dependencies: IDependencies) => {
  const {
    useCases: { getAllInstructorUseCase },
  } = dependencies;
  return async (req: Request, res:Response, next:NextFunction) => {
    try {
      const { _limit, _page }: any = req.query;
      const allInstructor = await getAllInstructorUseCase(dependencies).execute(
        {
          _limit,
          _page,
        }
      );

      res.status(200).json(allInstructor);
    } catch (error) {
      next(error);
    }
  };
};
