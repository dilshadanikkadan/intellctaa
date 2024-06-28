import { BadRequestError } from "@intellectaa/common";
import { findEamil } from "./findEmail";

export const instructorCreate = async (payload: any) => {
  try {
    const { email } = payload;
    const user = await findEamil(email);
    if (!user) throw new BadRequestError("user not found");
    user.isInstructor = true;
    await user.save();
    console.log("**********************after updation",user);
    
  } catch (error) {
    console.log(error);
  }
};
