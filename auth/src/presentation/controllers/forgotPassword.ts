import { IDependencies } from "@/application/interfaces/IDependencies";
import userCreated, {
  ForgotPasswordBatch,
} from "@/infrastructure/kafka/producer/userCreated";

export const forgotPasswordController = (dependencies: IDependencies) => {
  const {
    useCases: { forgotPasswordUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      console.log("otp resent", req.body);
  
      const response = await forgotPasswordUseCase(dependencies).execute(
        req.body
      );
      userCreated.produceAll(
        { payload: response },
        ForgotPasswordBatch(response)
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
};
