import { AuthTopics } from "@intellectaa/common"
import emailConsumer from "./consumer/email.consumer"
import forgotPasswordConsumer from "./consumer/fogor.password.consumer"

export const  createSubscriber=()=>{
    
   return {
      [AuthTopics.UserCreated ]:emailConsumer.execute,
      [AuthTopics.ForgotPassword]:forgotPasswordConsumer.execute
   }
}