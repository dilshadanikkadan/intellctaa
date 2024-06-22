import { config } from "@/_boot/config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
type UserPayload = {
  isAdmin: boolean | undefined;
  id: ObjectId;
  email: string;
  isInstructor: boolean | undefined;
};

export const generateAccessToken = (payload: UserPayload) => {
  return jwt.sign(payload, config.secrets.access_token,{expiresIn:'15m'});
};

export const generateRefreshToken = (payload: UserPayload) => {
    return jwt.sign(payload, config.secrets.access_token,{expiresIn:'30m'});
  };
  

  export const generateForgotPasswordToken = (payload: any) => {
    return jwt.sign({payload}, config.secrets.access_token,{expiresIn:'30m'});
  };
  