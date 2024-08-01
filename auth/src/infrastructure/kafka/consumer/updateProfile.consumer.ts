import { updateProfile } from "@/infrastructure/database/mongo/repositories/usesr/updateProfile"

export const updateProfileConsumer=async(payload)=>{
    try {
         await updateProfile(payload);
    } catch (error) {
        
    }
}