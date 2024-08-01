import { findEamil } from "@/infrastructure/database/mongo/repositories/usesr/findEmail";
import { IDependencies } from "../interfaces/IDependencies";
import { BadRequestError } from "@intellectaa/common";
import { Password } from "@/_lib/utils/services/password/password.service";
import { generateRefreshToken } from "@/_lib/utils/services/token/generateAccessToken";

export const loginUseCase = (dependencies: IDependencies) => {
  const {
    repositories: {},
  } = dependencies;
  return {
    execute: async (data: any) => {
      const { email, password } = data;
      const user = await findEamil(email);
      if (!user) throw new BadRequestError("User not exist");
      if (user.isAdmin) {
        const refreshToken = await generateRefreshToken({
          id: user._id,
          email: user.email,
          isAdmin: user.isAdmin,
          isInstructor: user?.isInstructor,
        });
        user.refreshToken = refreshToken;
        await user.save();
        return user;
      }
      if (user.isAuth)
        throw new BadRequestError("User have already google acc");
      if (user.isBlocked) throw new BadRequestError("You have been bloacked");
      const isMatch = await Password.compare(user.password as string, password);
      if (!isMatch) throw new BadRequestError("Incorrect password");
      const refreshToken = await generateRefreshToken({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
      });
      user.refreshToken = refreshToken;
      await user.save();
      return user;
    },
  };
};
