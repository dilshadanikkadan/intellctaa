import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EmailModule,
    EventEmitterModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
