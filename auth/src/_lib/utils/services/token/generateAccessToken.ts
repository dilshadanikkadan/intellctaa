import { config } from "@/_boot/config";
import jwt from "jsonwebtoken";
import { SignJWT } from "jose";
import { ObjectId } from "mongoose";

type UserPayload = {
  isAdmin: boolean | undefined;
  id: ObjectId;
  email: string;
  isInstructor: boolean | undefined;
};

// export const generateAccessToken = (payload: UserPayload) => {
//   return jwt.sign(payload, config.secrets.access_token,{expiresIn:'15m'});
// };
const JWT_SECRET = new TextEncoder().encode(config.secrets.access_token);

export const generateAccessToken = async (payload: UserPayload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30m")
    .sign(JWT_SECRET);

  return token;
};

export const generateRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, config.secrets.access_token, { expiresIn: "30m" });
};

export const generateForgotPasswordToken = (payload: any) => {
  return jwt.sign({ payload }, config.secrets.access_token, {
    expiresIn: "30m",
  });
};
