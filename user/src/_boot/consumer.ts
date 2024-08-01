import { consumer } from "@/infrastructure/kafka";
import { createSubscriber } from "@/infrastructure/kafka/baseConsumer";
import { KafkaConsumer, Subjects } from "@intellectaa/common";
import { EachMessagePayload } from "kafkajs";

 class GlobalConsumer extends KafkaConsumer {
    subject: Subjects = Subjects.UserService;
    groupId = Subjects.UserCreated;
  
    constructor() {
      super(consumer);
    }
  
    async handleMessage(payload: EachMessagePayload): Promise<void> {
      if (payload.message.value) {
        const { key } = payload.message;
        const credentials = await JSON.parse(payload.message.value.toString());
        console.log("================================");
        console.log(credentials);
        
        const subScriber = createSubscriber();
        const subscriberMethod = String(key);
        subScriber[subscriberMethod](credentials);   
      } else {
        console.error('Received message with undefined value');
      }
    }
  }

  export default new GlobalConsumer