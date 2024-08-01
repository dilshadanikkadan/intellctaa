import { Module } from '@nestjs/common';
import { EntrollmentController } from './entrollment.controller';
import { EntrollmentService } from './entrollment.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Enrollment,
  EnrollmentSchema,
} from 'src/databse/models/entrollment.model';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MongooseModule.forFeature([
      { name: Enrollment.name, schema: EnrollmentSchema },
    ]),
  ],

  controllers: [EntrollmentController],
  providers: [EntrollmentService],
})
export class EntrollmentModule {}
