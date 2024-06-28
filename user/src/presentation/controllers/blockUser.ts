import { generateAccessToken } from "@/_lib/utils/services/token/generateAccessToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import userCreated, {
  UserBlockBatch,
} from "@/infrastructure/kafka/producer/userCreated";
export const blockController = (dependencies: IDependencies) => {
  const {
    useCases: { blockUseCase },
  } = dependencies;
  return async (req: Request, res, next) => {
    try {
      const savedUser = await blockUseCase(dependencies).execute(req.body);
      userCreated.produceAll({ payload: savedUser }, UserBlockBatch(savedUser));
      const token = await generateAccessToken({
        id: savedUser._id,
        email: savedUser.email,
        isAdmin: savedUser.isAdmin,
        isInstructor: savedUser?.isInstructor,
        isBlocked:true,
      });
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log(token);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      });
      res.status(200).json(savedUser);
    } catch (error) {
      next(error);
    }
  };
};
