import { User } from "../../models/User";

export const findEamil = async (email: any) => {
  try {
    const emaiExist = User.findOne({ email });
    return emaiExist;
  } catch (error) {}
};
