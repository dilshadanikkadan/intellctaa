import { AuthTopics, ChatTopics, PaymentTopics } from "@intellectaa/common";
import { userCreatedConsumer } from "./consumer/userCreatedConsumer";
import { chatCreatedConsumer } from "./consumer/chatCreatedConsumer";
import { newJoinRoom } from "./consumer/newJoioneeRoomConsumer";

export const createSubscriber = () => {
  return {
    [AuthTopics.UseSaved]: userCreatedConsumer,
    [ChatTopics.ChatCreated]: chatCreatedConsumer,
    [PaymentTopics.PaymentSuccess]: newJoinRoom,
  };
};
