import { AuthTopics } from "@intellectaa/common"
import { userCreatedConsumer } from "./consumer/userCreatedConsumer"

export const  createSubscriber=()=>{
    
   return {
      [AuthTopics.UseSaved ]:userCreatedConsumer,
   }
}