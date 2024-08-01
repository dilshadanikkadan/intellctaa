import { BadRequestError } from "@intellectaa/common";
import { findEamil } from "./findEmail";

export const currentUser = async (payload: any) => {

  const user = await findEamil(payload.email);
  if (!user) throw new BadRequestError("User not Exist");
  return user;
};
