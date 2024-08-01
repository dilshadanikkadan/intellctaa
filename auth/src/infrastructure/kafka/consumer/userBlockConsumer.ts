import { blockUser } from "@/infrastructure/database/mongo/repositories/usesr/blockUser"

export  const userBlockConsumer=async(payload)=>{
    try {
        await blockUser(payload)
    } catch (error) {
        
    }
}