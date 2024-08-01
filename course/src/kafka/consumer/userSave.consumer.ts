import { EventEmitter2 } from '@nestjs/event-emitter';

class UserSaveConsumer {
  constructor() {}
  execute(payload:any, eventEmitter: EventEmitter2) {
    try {
      eventEmitter.emit('user.saved', payload);
    } catch (error) {
      console.log(error);
    }
  }
}
const userSaveConsumer = new UserSaveConsumer();
export default userSaveConsumer;
