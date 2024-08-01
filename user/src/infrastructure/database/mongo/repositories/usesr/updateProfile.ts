import { User } from "../../models/User";

export const updateProfile = async(payload)=>{
    console.log("________________________");
    console.log(payload);
    console.log("________________________");
    const {userId,...rest}= payload;
    const updatedUser = await User.findByIdAndUpdate(userId,{
        $set:{
            ...rest
        }
    },{new:true})
    return updatedUser
}