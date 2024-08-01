import { AuthTopics, ChatTopics, KafkaProducer, PaymentTopics, Subjects } from "@intellectaa/common";
import { Producer } from "kafkajs";
import { producer } from "../consumer/global.consumer";
import { TOBE } from "src/services/constants/Tobe";

export interface Event {
  subject: Subjects;
  data: TOBE;
}
class CourseProducer extends KafkaProducer<Event> {
  constructor(producer: Producer) {
    super(producer);
  }
  subject: Subjects.UserCreated = Subjects.UserCreated;
}

export const UserBatchMessages = (data: TOBE): TOBE => {
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

export const UserBlockBatch = (data: TOBE): TOBE => {
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
};

export const InstructorCreateBatch = (data: TOBE): TOBE => {
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
};
export const ForgotPasswordBatch = (data: TOBE): TOBE => {
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

export const paymentSuccessBatch = (data: TOBE): TOBE => {
  return [
    {
      topic: Subjects.CourseService,
      messages: [
        {
          key: PaymentTopics.PaymentSuccess,
          value: JSON.stringify(data),
        },
      ],
    },
    {
      topic: Subjects.UserService,
      messages: [
        {
          key: PaymentTopics.PaymentSuccess,
          value: JSON.stringify(data),
        },
      ],
    },
    {
      topic: Subjects.AuthService,
      messages: [
        {
          key: PaymentTopics.PaymentSuccess,
          value: JSON.stringify(data),
        },
      ],
    },
  ];
};


export const ChatCreatedBatch = (data: TOBE): TOBE => {
    return [
      {
        topic: Subjects.ChatService,
        messages: [
          {
            key: ChatTopics.ChatCreated,
            value: JSON.stringify(data),
          },
        ],
      },
    ];
  };

export const courseProducer = new CourseProducer(producer);
