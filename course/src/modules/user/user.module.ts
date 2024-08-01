import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCreatedConsumer } from 'src/kafka/consumer/global.consumer';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/databse/models/user.model';

@Module({
  imports:[EventEmitterModule.forRoot(),MongooseModule.forFeature([{name:User.name,schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService,UserCreatedConsumer]
})
export class UserModule {}
