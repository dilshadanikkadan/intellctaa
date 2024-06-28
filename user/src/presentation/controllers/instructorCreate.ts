import { IDependencies } from "@/application/interfaces/IDependencies";
import userCreated, {
  InstructorCreateBatch,
} from "@/infrastructure/kafka/producer/userCreated";
export const instructorCreateController = (dependencies: IDependencies) => {
  const {
    useCases: { instructorCreateUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const savedUser = await instructorCreateUseCase(dependencies).execute(
        req.body
      );
      userCreated.produceAll(
        { payload: savedUser },
        InstructorCreateBatch(savedUser)
      );

      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  };
};
