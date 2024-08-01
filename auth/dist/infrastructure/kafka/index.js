"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = void 0;
const kafkajs_1 = require("kafkajs");
const config_1 = require("@/_boot/config");
const kafka = new kafkajs_1.Kafka({
    brokers: [config_1.config.kafka.broker_urls],
    clientId: config_1.config.kafka.client_id,
});
exports.producer = kafka.producer();
exports.consumer = kafka.consumer({
    groupId: "auth-service-group",
});
