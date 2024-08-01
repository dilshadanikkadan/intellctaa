import { BadRequestError } from "@intellectaa/common";
import { findEamil } from "./findEmail";
import { generateForgotPasswordToken } from "@/_lib/utils/services/token/generateAccessToken";

export const forgotPassword = async (payload: any) => {
  const { email } = payload;
  const user = await findEamil(email);

  if (!user) {
    throw new BadRequestError("Email Do Not Exist");
  }
  const token = generateForgotPasswordToken(email);
  
  return {
    email,
    token,
  };
};
