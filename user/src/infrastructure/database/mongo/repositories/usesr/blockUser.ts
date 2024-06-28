import { BadRequestError } from "@intellectaa/common";
import { User } from "../../models/User";

export const blockUser = async (payload: any) => {
    const {email}= payload
  const user = await User.findOne({ email });
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
  console.log(user);
  
  

  if (!user) {
    throw new BadRequestError("User not found");
  }

  const updatedUser = await User.findOneAndUpdate(
    { email },
    { $set: { isBlocked: !user.isBlocked } },
    { new: true }
  );

  return updatedUser;
};
