import { User } from "../../models/User";

export const getAllUser = async (email: any) => {
  try {
    const allUsers = await User.find({ isAdmin: { $ne: true } });
    return allUsers;
  } catch (error) {}
};
