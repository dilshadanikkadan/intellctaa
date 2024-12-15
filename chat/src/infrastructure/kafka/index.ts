import { Kafka, Producer, Consumer } from "kafkajs";
// import { config } from "@/_boot/config";

export const kafka = new Kafka({
    brokers: ['ctf3htrkt6m8edsm8osg.any.eu-central-1.mpx.prd.cloud.redpanda.com:9092'],
   clientId: 'kafka-course-client',
    ssl:true,
    sasl: {
        mechanism: "scram-sha-256",
        username: "dilshad",
        password: "XmR91HeQI3E2qjPNKbaPyErRwFja0w",
    },
    connectionTimeout: 30000, 
    authenticationTimeout: 30000,
});

export const producer: Producer = kafka.producer();
export const consumer: Consumer = kafka.consumer({
    groupId: "chat-service-group",
});