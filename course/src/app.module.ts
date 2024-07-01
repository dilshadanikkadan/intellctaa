import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CodeModule } from './modules/code/code.module';

@Module({
  imports: [
    EmailModule,
    EventEmitterModule.forRoot(),
    CodeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
