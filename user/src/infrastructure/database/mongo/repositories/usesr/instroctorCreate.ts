import { BadRequestError } from "@intellectaa/common";
import { findEamil } from "./findEmail";


export const instructorCreate = async (payload: any) => {
    console.log(payload);
    const {email,firstName,lastName}= payload
    const user = await findEamil(email);
    if(!user) throw new BadRequestError('User is not Found');
    user.firstName= firstName
    user.lastName= lastName
    user.isInstructor=true    
    user.role="instructor"    
    await user.save()
     return user
};
