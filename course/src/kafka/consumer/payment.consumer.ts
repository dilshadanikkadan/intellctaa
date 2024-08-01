import { EventEmitter2 } from '@nestjs/event-emitter';

class PaymentConsumer {
  constructor() {}
  execute(payload:any, eventEmitter: EventEmitter2) {
    try {
      eventEmitter.emit('entroll.saved', payload);
    } catch (error) {
      console.log(error);
    }
  }
}
const paymentConsumer = new PaymentConsumer();
export default paymentConsumer;
