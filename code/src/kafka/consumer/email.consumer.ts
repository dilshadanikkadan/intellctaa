import { EventEmitter2 } from '@nestjs/event-emitter';

class EmailConsumer {
  constructor() {}
  execute(payload:any, eventEmitter: EventEmitter2) {
    try {
      eventEmitter.emit('user.created', payload);
    } catch (error) {
      console.log(error);
    }
  }
}
const emailConsumer = new EmailConsumer();
export default emailConsumer;
