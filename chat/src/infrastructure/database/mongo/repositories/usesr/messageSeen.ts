import { MessageModel } from "../../models/Message"

export const messageSeen=async(roomId:string):Promise<any> =>{
    try {
        const msg = await MessageModel.updateMany({roomId},{$set:{read:true}})
        return msg
    } catch (error) {
        
    }
}