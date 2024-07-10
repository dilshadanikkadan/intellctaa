import { AuthTopics, PaymentTopics } from "@intellectaa/common";
import { userBlockConsumer } from "./consumer/userBlockConsumer";
import { userInstructorConsumer } from "./consumer/userInstructorMake.consumer";
import { updateProfileConsumer } from "./consumer/updateProfile.consumer";
import { paymentConsumer } from "./consumer/paymentSuccess.consumer";

export const createSubscriber = () => {
  return {
    [AuthTopics.UserUpdated]: userBlockConsumer,
    [AuthTopics.UserInstructorCreate]: userInstructorConsumer,
    [AuthTopics.UserPrfilePatch]: updateProfileConsumer,
    [PaymentTopics.PaymentSuccess]:paymentConsumer
  };
};
