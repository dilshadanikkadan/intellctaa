import {
  generateAccessToken,
  generateRefreshToken,
} from "@/_lib/utils/services/token/generateAccessToken";
import { IDependencies } from "@/application/interfaces/IDependencies";
import { User } from "@/infrastructure/database/mongo/models/User";
import userCreated, {
  UserSavedBatch,
} from "@/infrastructure/kafka/producer/userCreated";
import { Request, Response } from "express";
import cookie from 'cookie';

export const googleSignUpController = (dependencies: IDependencies) => {
  const {
    useCases: { createUserUseCase, googleLoginUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next) => {
    try { 
      const { email, given_name, mode }: any = req.body;

      const userExist = await User.findOne({ email });

      let user;
      if (userExist) {
        user = await googleLoginUseCase(dependencies).execute({
          email,
          username: given_name,
          password: "vbnmmmmN",
          mode,
        });
      } else {
        user = await createUserUseCase(dependencies).execute({
          email,
          username: given_name,
          password: "vbnmmmmN",
        });
      }

      const token =await generateAccessToken({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
      });

      const refreshToken = generateRefreshToken({
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
        isInstructor: user?.isInstructor,
      });

      res.setHeader('Set-Cookie', [
        cookie.serialize('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'lax',
          path: '/',
        }),
        cookie.serialize('token', user?._id, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          sameSite: 'lax',
          path: '/',
        }),
      ]);

      console.log("___________________________-");
      console.log(token);
      console.log("___________________________-");
      

      await User.findByIdAndUpdate(user._id, {
        $set: { isAuth: true, refreshToken, otp: "null", isVerified: true },
      });
      userCreated.produceAll({ payload: user }, UserSavedBatch(user));

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
};
