"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfilePatchBatch = exports.ForgotPasswordBatch = exports.InstructorCreateBatch = exports.UserBlockBatch = exports.UserBatchMessages = void 0;
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
const UserBlockBatch = (data) => {
    return [
        {
            topic: common_1.Subjects.AuthService,
            messages: [
                {
                    key: common_1.AuthTopics.UserUpdated,
                    value: JSON.stringify(data),
                },
            ],
        },
    ];
};
exports.UserBlockBatch = UserBlockBatch;
const InstructorCreateBatch = (data) => {
    return [
        {
            topic: common_1.Subjects.AuthService,
            messages: [
                {
                    key: common_1.AuthTopics.UserInstructorCreate,
                    value: JSON.stringify(data),
                },
            ],
        },
    ];
};
exports.InstructorCreateBatch = InstructorCreateBatch;
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
const UserProfilePatchBatch = (data) => {
    return [
        {
            topic: common_1.Subjects.AuthService,
            messages: [
                {
                    key: common_1.AuthTopics.UserPrfilePatch,
                    value: JSON.stringify(data),
                },
            ],
        },
        {
            topic: common_1.Subjects.CourseService,
            messages: [
                {
                    key: common_1.AuthTopics.UserPrfilePatch,
                    value: JSON.stringify(data),
                },
            ],
        },
    ];
};
exports.UserProfilePatchBatch = UserProfilePatchBatch;
exports.default = new UserCreated(__1.producer);
