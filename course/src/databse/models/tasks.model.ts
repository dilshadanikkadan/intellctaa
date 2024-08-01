import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TaskDoc = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: [String] })
  problems: [];
   
  @Prop({ type: [String], default: [] })
  submissions: [];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
