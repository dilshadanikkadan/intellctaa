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
        host: 'redis-stack',
        port: 6379,
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
