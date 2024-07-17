import { UserEntity } from "@/domain/entities";
import { User } from "../../models/User";

export const createUser = async (payload: UserEntity) => {
  console.log("_______%%%%from create user");

  const newUser = new User({
    ...payload,
  });
  return await newUser.save();
};
