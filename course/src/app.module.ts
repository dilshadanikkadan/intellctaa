import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CodeModule } from './modules/code/code.module';
import { CourseModule } from './modules/course/course.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { EntrollmentModule } from './modules/entrollment/entrollment.module';
import { SubmissionModule } from './modules/submission/submission.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://dilu1234:dilshad4321@cluster0.mx2yncu.mongodb.net/courese-service'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
      }),
      inject: [ConfigService],
    }),
    EmailModule,
    EventEmitterModule.forRoot(),
    CodeModule, 
    CourseModule, UserModule, EntrollmentModule, SubmissionModule, TasksModule, CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 
