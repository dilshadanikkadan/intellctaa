import { UserEntity } from "@/domain/entities";
import { createUser } from "@/infrastructure/database/mongo/repositories/usesr";

export const userCreatedConsumer=async(payload:UserEntity)=>{
    try {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",payload);
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        
       await createUser(payload) 
    } catch (error) {
        console.log(error);
        
    }
}