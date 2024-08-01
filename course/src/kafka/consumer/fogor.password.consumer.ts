import { EventEmitter2 } from '@nestjs/event-emitter';

class ForgotPasswordConsumer {
  constructor() {}
  execute(payload: any, eventEmitter: EventEmitter2) {
    try {
      console.log('=========================================');
      console.log(payload);
      console.log('=========================================');
      eventEmitter.emit('forgotPassword.created', payload);
    } catch (error) {
      console.log(error);
    }
  }
}

const forgotPasswordConsumer = new ForgotPasswordConsumer();
export default forgotPasswordConsumer;
