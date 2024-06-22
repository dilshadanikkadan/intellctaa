import { BadRequestError } from "@intellectaa/common";
import { User } from "../../models/User";
import jwt from "jsonwebtoken";
import { config } from "@/_boot/config";
import { generateAccessToken } from "@/_lib/utils/services/token/generateAccessToken";
export const refreshToken = async (payload: any) => {
  console.log("paload refreshstoken");
  const { userId } = payload;
  const user = await User.findById(userId);

  if (!user || !user.refreshToken) {
    throw new BadRequestError("Invalid user session");
  }

  jwt.verify(user.refreshToken, config.secrets.refresh_token);
  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    isInstructor: user?.isInstructor,
  });

  const refreshToken = generateAccessToken({
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    isInstructor: user?.isInstructor,
  });
  user.refreshToken = refreshToken;
  await user.save();
  return accessToken;
};
