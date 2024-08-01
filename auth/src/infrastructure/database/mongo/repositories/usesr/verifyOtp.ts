import { BadRequestError } from "@intellectaa/common";
import { findEamil } from "./findEmail";
import ms from "ms";
import { generateRefreshToken } from "@/_lib/utils/services/token/generateAccessToken";
export const verifyOtp = async (payload: any) => {
  const { email, otp } = payload;

  const user = await findEamil(email);
  if (!user) throw new BadRequestError("Email does not Exits!!");
  console.log(otp);

  if (otp !== user.otp) throw new BadRequestError("Otp verification Failed!!");

  const currentTime = Date.now();
  const otpExpirationTime = Number(user?.otpExp ?? 0);
  const expTime = ms("60s");
  if (currentTime - otpExpirationTime > expTime) {
    throw new BadRequestError("OTP has expired");
  }
  // setting the verification
  user.isVerified = true;
  await user.save();

  const refreshToken = generateRefreshToken({
    id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
    isInstructor: user?.isInstructor,
  });
  user.refreshToken = refreshToken;
  await user.save();
  return user;
};
