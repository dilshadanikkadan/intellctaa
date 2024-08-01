"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
const config_1 = require("@/_boot/config");
exports.kafka = new kafkajs_1.Kafka({
    brokers: [config_1.config.kafka.broker_urls],
    clientId: config_1.config.kafka.client_id,
});
exports.producer = exports.kafka.producer();
exports.consumer = exports.kafka.consumer({
    groupId: "payment-service-group",
});
