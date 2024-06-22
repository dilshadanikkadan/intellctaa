import { IDependencies } from "@/application/interfaces/IDependencies";
import userCreated, {
  UserBatchMessages,
} from "@/infrastructure/kafka/producer/userCreated";

export const createUserController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const savedUser = await createUserUseCase(dependencies).execute(req.body);
      userCreated.produceAll(
        { payload: savedUser },
        UserBatchMessages(savedUser)
      );
      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  }; 
}; 
