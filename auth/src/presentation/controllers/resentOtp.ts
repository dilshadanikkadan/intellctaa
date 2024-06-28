import { IDependencies } from "@/application/interfaces/IDependencies";
import userCreated, { UserBatchMessages } from "@/infrastructure/kafka/producer/userCreated";


export const resentOtpController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
        console.log("otp resent",req.body);
        
      const response = await createUserUseCase(dependencies).execute(req.body);
      userCreated.produceAll(
        { payload: response },
        UserBatchMessages(response)
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
};
