import { AuthTopics, KafkaProducer, Subjects } from "@intellectaa/common";
import { Producer } from "kafkajs";
import { producer } from "..";

export interface Event {
  subject: Subjects;
  data: any;
}
class UserCreated extends KafkaProducer<Event> {
  constructor(producer: Producer) {
    super(producer);
  }
  subject: Subjects.UserCreated = Subjects.UserCreated;
}

export const UserBatchMessages = (data: any): any => {
  return [
    {
      topic: Subjects.NotificationService,
      messages: [
        {
          key: AuthTopics.UserCreated,
          value: JSON.stringify(data),
        },
      ],
    },
  ];
};

export const UserBlockBatch=(data:any):any=>{
  return [
    {
      topic: Subjects.AuthService,
      messages: [
        {
          key: AuthTopics.UserUpdated,
          value: JSON.stringify(data),
        },
      ],
    },
  ];
}

export const InstructorCreateBatch=(data:any):any=>{
  return [
    {
      topic: Subjects.AuthService,
      messages: [
        {
          key: AuthTopics.UserInstructorCreate,
          value: JSON.stringify(data),
        },
      ],
    },
  ];
}
export const ForgotPasswordBatch = (data: any): any => {
  return [
    {
      topic: Subjects.NotificationService,
      messages: [
        {
          key: AuthTopics.ForgotPassword,
          value: JSON.stringify(data),
        },
      ],
    },
  ];
};

export const UserProfilePatchBatch = (data: any): any => {
  return [
    {
      topic: Subjects.AuthService,
      messages: [
        {
          key: AuthTopics.UserPrfilePatch,
          value: JSON.stringify(data),
        },
      ],
    },
    {
      topic: Subjects.CourseService,
      messages: [
        {
          key: AuthTopics.UserPrfilePatch,
          value: JSON.stringify(data),
        },
      ],
    },

  ];
};
export default new UserCreated(producer);
