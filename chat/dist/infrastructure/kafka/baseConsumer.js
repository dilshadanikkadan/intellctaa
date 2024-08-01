"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriber = void 0;
const common_1 = require("@intellectaa/common");
const userCreatedConsumer_1 = require("./consumer/userCreatedConsumer");
const chatCreatedConsumer_1 = require("./consumer/chatCreatedConsumer");
const newJoioneeRoomConsumer_1 = require("./consumer/newJoioneeRoomConsumer");
const createSubscriber = () => {
    return {
        [common_1.AuthTopics.UseSaved]: userCreatedConsumer_1.userCreatedConsumer,
        [common_1.ChatTopics.ChatCreated]: chatCreatedConsumer_1.chatCreatedConsumer,
        [common_1.PaymentTopics.PaymentSuccess]: newJoioneeRoomConsumer_1.newJoinRoom,
    };
};
exports.createSubscriber = createSubscriber;
