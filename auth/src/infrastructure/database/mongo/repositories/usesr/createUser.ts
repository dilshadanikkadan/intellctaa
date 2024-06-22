import { UserEntity } from "@/domain/entities";
import { User } from "../../models/User";
import { generateOTP } from "@/_lib/utils/services/otp/otp.service";
import { findEamil } from "./findEmail";
import { BadRequestError } from "@intellectaa/common";
import { deleteUser } from "./deleteDoc";

export const createUser = async (payload: UserEntity) => {
  console.log(payload);

  const { password, email, ...rest } = payload;
  const user = await findEamil(email);
  if (!user?.isVerified) {
    await deleteUser(email);
  }
  if (user?.isVerified) {
    throw new BadRequestError("Email Aleady Exist");
  }
  const otp = generateOTP();
  const newUser = new User({
    ...rest,
    email,
    otp,
    otpExp: Date.now(),
    password,
  });
  return await newUser.save();
};
