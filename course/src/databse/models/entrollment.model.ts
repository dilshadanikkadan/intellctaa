import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Progress {
  @Prop({ type: [Types.ObjectId], default: [] })
  completedLessons: Types.ObjectId[];
}

@Schema()
export class Enrollment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Course', required: true })
  courseId: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  enrolledAt: Date;

  @Prop({ type: String })
  courseMode: string;
  
  @Prop({ type: Number })
  amount: number;

  @Prop({
    type: String,
    enum: ['enrolled', 'in-progress', 'completed'],
    default: 'enrolled',
  })
  completionStatus: string;

  @Prop({ type: Progress, default: {} })
  progress: Progress;
}

export const EnrollmentSchema = SchemaFactory.createForClass(Enrollment);
