import { Module } from '@nestjs/common';
import { ExcutionController } from './excution.controller';
import { ExcutionService } from './excution.service';
import { CodeExecutionQueue } from 'src/queue/code-execution.queue';
import { CodeExecutionProcessor } from 'src/queue/code-execution.processor';
import { BullModule } from '@nestjs/bull';


@Module({
  imports: [
    BullModule.registerQueue({
      name: 'code-execution',
    }),
  ],
  controllers: [ExcutionController],
  providers: [ExcutionService,CodeExecutionQueue,CodeExecutionProcessor ]
})
export class ExcutionModule {}
