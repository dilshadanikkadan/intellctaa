"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSavedBatch = exports.ForgotPasswordBatch = exports.UserBatchMessages = void 0;
const common_1 = require("@intellectaa/common");
const __1 = require("..");
class UserCreated extends common_1.KafkaProducer {
    constructor(producer) {
        super(producer);
    }
    subject = common_1.Subjects.UserCreated;
}
const UserBatchMessages = (data) => {
    return [
        {
            topic: common_1.Subjects.NotificationService,
            messages: [
                {
                    key: common_1.AuthTopics.UserCreated,
                    value: JSON.stringify(data),
                },
            ],
        },
    ];
};
exports.UserBatchMessages = UserBatchMessages;
const ForgotPasswordBatch = (data) => {
    return [
        {
            topic: common_1.Subjects.NotificationService,
            messages: [
                {
                    key: common_1.AuthTopics.ForgotPassword,
                    value: JSON.stringify(data),
                },
            ],
        },
    ];
};
exports.ForgotPasswordBatch = ForgotPasswordBatch;
const UserSavedBatch = (data) => {
    return [
        {
            topic: common_1.Subjects.UserService,
            messages: [
                {
                    key: common_1.AuthTopics.UseSaved,
                    value: JSON.stringify(data),
                },
            ],
        },
        {
            topic: common_1.Subjects.CourseService,
            messages: [
                {
                    key: common_1.AuthTopics.UseSaved,
                    value: JSON.stringify(data),
                },
            ],
        },
        {
            topic: common_1.Subjects.ChatService,
            messages: [
                {
                    key: common_1.AuthTopics.UseSaved,
                    value: JSON.stringify(data),
                },
            ],
        },
    ];
};
exports.UserSavedBatch = UserSavedBatch;
exports.default = new UserCreated(__1.producer);
