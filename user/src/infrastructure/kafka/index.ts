import { Kafka, Producer, Consumer, logLevel, Partitioners } from "kafkajs";
// import { config } from "@/_boot/config";

export const kafka = new Kafka({
    brokers: ['crd85ep2b32l8feg5b6g.any.eu-central-1.mpx.prd.cloud.redpanda.com:9092'],
   clientId: 'kafka-course-client',
    ssl:true,
    sasl: {
        mechanism: "scram-sha-256",
        username: "dilshad",
        password: "XmR91HeQI3E2qjPNKbaPyErRwFja0w",
    },
    connectionTimeout: 30000, 
    authenticationTimeout: 30000,
    logLevel: logLevel.DEBUG
});

export const producer: Producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner
});
export const consumer: Consumer = kafka.consumer({
    groupId: "user-service-group",
});