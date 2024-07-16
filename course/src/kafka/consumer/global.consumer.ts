import { KafkaConsumer, Subjects } from '@intellectaa/common';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Kafka, EachMessagePayload, Producer } from 'kafkajs';
import { createSubscriber } from '..';

const kafka = new Kafka({
  clientId: 'caourse-service',
  brokers: ['localhost:29092'],
});

const consumer = kafka.consumer({
  groupId: 'caourse-group',
});
export const producer: Producer = kafka.producer();
export class UserCreatedCon extends KafkaConsumer {
  subject: Subjects = Subjects.CourseService;
  groupId = Subjects.CourseService;
 
  constructor(private readonly eventEmitter: EventEmitter2) {
    super(consumer);
  } 
  
  async handleMessage(payload: EachMessagePayload): Promise<void> {
    if (payload.message.value) {
      const { key, value } = payload.message;
      const credentials = await JSON.parse(payload.message.value.toString());
      console.log("+++++++++",credentials);
      
      const subScriber = createSubscriber();
      const subscriberMethod = String(key);
      subScriber[subscriberMethod](credentials, this.eventEmitter );
    } else {
      console.error('Received message with undefined value');
    } 
  } 
}

@Injectable() 
export class UserCreatedConsumer implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  async onModuleInit() {
    try {
      const userConsumer = new UserCreatedCon(this.eventEmitter);
      userConsumer.listen();
    } catch (error) {
      console.error('Error initializing Kafka consumer', error);
    }
  }
  async onModuleDestroy() {
    await consumer.disconnect();
  }
}
