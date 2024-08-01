"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafka_1 = require("@/infrastructure/kafka");
const baseConsumer_1 = require("@/infrastructure/kafka/baseConsumer");
const common_1 = require("@intellectaa/common");
class GlobalConsumer extends common_1.KafkaConsumer {
    subject = common_1.Subjects.ChatService;
    groupId = common_1.Subjects.UserCreated;
    constructor() {
        super(kafka_1.consumer);
    }
    async handleMessage(payload) {
        if (payload.message.value) {
            const { key } = payload.message;
            const credentials = await JSON.parse(payload.message.value.toString());
            console.log("================================");
            console.log(credentials);
            const subScriber = (0, baseConsumer_1.createSubscriber)();
            const subscriberMethod = String(key);
            subScriber[subscriberMethod](credentials);
        }
        else {
            console.error('Received message with undefined value');
        }
    }
}
exports.default = new GlobalConsumer;
