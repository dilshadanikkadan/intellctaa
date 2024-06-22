import { User } from "../../models/User";

export const deleteUser = async (email: any) => {
  try {
    const emailDelete = User.findOneAndDelete({ email });
    return emailDelete;
  } catch (error) {}
};
