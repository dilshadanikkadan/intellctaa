import { AuthTopics } from "@intellectaa/common";
import { userBlockConsumer } from "./consumer/userBlockConsumer";
import { userInstructorConsumer } from "./consumer/userInstructorMake.consumer";

export const createSubscriber = () => {
  return {
    [AuthTopics.UserUpdated]: userBlockConsumer,
    [AuthTopics.UserInstructorCreate]: userInstructorConsumer,
  };
};
