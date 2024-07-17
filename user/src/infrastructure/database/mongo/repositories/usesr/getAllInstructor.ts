import { User } from "../../models/User";

export const getAllInstructor = async () => {
  return await User.find({ isInstructor: true });
};
