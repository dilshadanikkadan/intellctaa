import { AuthTopics, PaymentTopics } from "@intellectaa/common"
import emailConsumer from "./consumer/email.consumer"
import forgotPasswordConsumer from "./consumer/fogor.password.consumer"
import userSaveConsumer from "./consumer/userSave.consumer"
import paymentConsumer from "./consumer/payment.consumer"

export const  createSubscriber=()=>{
    
   return {
      [AuthTopics.UserCreated ]:emailConsumer.execute,
      [AuthTopics.ForgotPassword]:forgotPasswordConsumer.execute,
      [AuthTopics.UseSaved]:userSaveConsumer.execute,
      [PaymentTopics.PaymentSuccess]:paymentConsumer.execute
   }
}