import { Request, Response } from "express";

import { IDependencies } from "@/application/interfaces/IDependencies";
import { OAuth2Client } from "google-auth-library";
import { config } from "@/_boot/config";
import { generateAccessToken, generateRefreshToken } from "@/_lib/utils/services/token/generateAccessToken";
const client = new OAuth2Client(config.secrets.google_cleint_id);
export const googleSignUpController = (dependencies: IDependencies) => {
  const {
    useCases: { googleLoginUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next) => {
    try {
      const { credential } = req.body;
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const { email, name, picture }: any = payload;
      const user = await googleLoginUseCase(dependencies).execute({
        email,
        name,
        picture,
      }); 

      
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
      res.cookie("token",token,{httpOnly: true})
      res.cookie("session_id",user?._id,{httpOnly: true})
      return res.json(user)
      console.log(user);
    } catch (error) {
      next(error);
    }
  };
};
