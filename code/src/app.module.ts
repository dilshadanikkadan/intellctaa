import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ExcutionModule } from './module/excution/excution.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis-18485.c114.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 18485,
        password: '6tUWVAf59j79lFBJI4MyD2Bu8MzaAKWc',
      },
    }),

    EmailModule,
    ExcutionModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
