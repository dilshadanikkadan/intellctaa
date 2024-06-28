import { User } from "@/infrastructure/database/mongo/models/User";
import { IDependencies } from "../interfaces/IDependencies";

export const googleLoginUseCase = (dependencies: IDependencies) => {
  return {
    execute: async (data: any) => {
      const { email }: any = data;
      const user = await User.findOne({ email });
      if (user) return user;
    },
  };
};
