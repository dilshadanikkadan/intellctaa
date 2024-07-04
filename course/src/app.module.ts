import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CodeModule } from './modules/code/code.module';
import { CourseModule } from './modules/course/course.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://dilu1234:dilshad4321@cluster0.mx2yncu.mongodb.net/courese-service'),
    // MongooseModule.forRoot('mongodb://localhost:27017/test_nest'),
    EmailModule,
    EventEmitterModule.forRoot(),
    CodeModule, 
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
