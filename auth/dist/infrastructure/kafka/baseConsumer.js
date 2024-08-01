"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriber = void 0;
const common_1 = require("@intellectaa/common");
const userBlockConsumer_1 = require("./consumer/userBlockConsumer");
const userInstructorMake_consumer_1 = require("./consumer/userInstructorMake.consumer");
const updateProfile_consumer_1 = require("./consumer/updateProfile.consumer");
const paymentSuccess_consumer_1 = require("./consumer/paymentSuccess.consumer");
const createSubscriber = () => {
    return {
        [common_1.AuthTopics.UserUpdated]: userBlockConsumer_1.userBlockConsumer,
        [common_1.AuthTopics.UserInstructorCreate]: userInstructorMake_consumer_1.userInstructorConsumer,
        [common_1.AuthTopics.UserPrfilePatch]: updateProfile_consumer_1.updateProfileConsumer,
        [common_1.PaymentTopics.PaymentSuccess]: paymentSuccess_consumer_1.paymentConsumer
    };
};
exports.createSubscriber = createSubscriber;
