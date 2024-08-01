"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriber = void 0;
const common_1 = require("@intellectaa/common");
const userCreatedConsumer_1 = require("./consumer/userCreatedConsumer");
const createSubscriber = () => {
    return {
        [common_1.AuthTopics.UseSaved]: userCreatedConsumer_1.userCreatedConsumer,
    };
};
exports.createSubscriber = createSubscriber;
