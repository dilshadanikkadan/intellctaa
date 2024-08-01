import { User } from "@/infrastructure/database/mongo/models/User";
import { IDependencies } from "../interfaces/IDependencies";
import userCreated, {
  UserSavedBatch,
} from "@/infrastructure/kafka/producer/userCreated";

export const googleLoginUseCase = (dependencies: IDependencies) => {
  return {
    execute: async (data: any) => {
      const { email, name, picture }: any = data;
      const user = await User.findOne({ email });
      if (user) return user;

      const newUser = new User({
        email,
        username: name,
        profile: picture,
        isAuth: true,
        password: "fghjkl",
      });

      userCreated.produceAll({ payload: newUser }, UserSavedBatch(newUser));
      return await newUser.save();
    },
  };
};
