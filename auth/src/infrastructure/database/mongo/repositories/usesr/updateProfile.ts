import { User } from "../../models/User";

export const updateProfile=async(payload): Promise<any>=>{
    const {userId,...rest}= payload;
    const updatedUser = await User.findByIdAndUpdate(userId,{
        $set:{
            ...rest
        }
    },{new:true})
    return updatedUser
}