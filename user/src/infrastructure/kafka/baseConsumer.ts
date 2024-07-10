import { AuthTopics, PaymentTopics } from "@intellectaa/common"
import { userCreatedConsumer } from "./consumer/userCreatedConsumer"
import { paymentConsumer } from "./consumer/paymentSuccess.consumer"

export const  createSubscriber=()=>{
    
   return {
      [AuthTopics.UseSaved ]:userCreatedConsumer,
      [PaymentTopics.PaymentSuccess]:paymentConsumer,
   }
}