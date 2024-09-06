    import { Kafka, Producer, Consumer } from "kafkajs";
    import { config } from "@/_boot/config";

    const kafka = new Kafka({
    brokers: [
        "crd85ep2b32l8feg5b6g.any.eu-central-1.mpx.prd.cloud.redpanda.com:9092",
    ],
    clientId: config.kafka.client_id,

    ssl: {
        rejectUnauthorized: false,
    },
    sasl: {
        mechanism: "scram-sha-256",
        username: "intellectaa",
        password: "mFcGaclJV2zDGmphhQoqnF1RUGnbmD",
    },
    connectionTimeout: 30000,
    authenticationTimeout: 30000,
    });

    export const producer: Producer = kafka.producer();
    export const consumer: Consumer = kafka.consumer({
    groupId: "auth-service-group",
    });
