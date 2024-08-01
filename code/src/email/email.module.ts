import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { UserCreatedConsumer } from 'src/kafka/consumer/global.consumer';
import { NodemailService } from 'src/services/nodeMailer.service';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [EmailController],
  providers: [EmailService, UserCreatedConsumer, NodemailService],
})
export class EmailModule {}
