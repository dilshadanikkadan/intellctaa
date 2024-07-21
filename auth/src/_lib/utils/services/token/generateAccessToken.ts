import { config } from "@/_boot/config";
import jwt from "jsonwebtoken";
import { SignJWT } from "jose";
import { ObjectId } from "mongoose";
import { TOBE } from "@/_lib/constants/Tobe";

type UserPayload = {
  isAdmin: boolean | undefined;
  id: ObjectId;
  email: string;
  isInstructor: boolean | undefined;
};
  

const JWT_SECRET = new TextEncoder().encode(config.secrets.access_token);

export const generateAccessToken = async (payload: UserPayload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("45m")
    .sign(JWT_SECRET);

  return token;
};

export const generateRefreshToken = (payload: UserPayload) => {
  return jwt.sign(payload, config.secrets.access_token, { expiresIn: "7d" });
};

export const generateForgotPasswordToken = (payload: TOBE) => {
  return jwt.sign({ payload }, config.secrets.access_token, {
    expiresIn: "30m",
  });
};
