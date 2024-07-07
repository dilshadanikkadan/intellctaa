
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type  SubmissionDoc= HydratedDocument<Submission>

@Schema()
export class Submission{
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'Course',})
    courseId: Types.ObjectId;
  
    @Prop({ type: Date, default: Date.now })
    submittedAt: Date;

    @Prop({ type: String })
    problemName: string;
    
    @Prop({type:String})
    problem: string;

    @Prop({type:Number,default:0})
    likes:number

}

export const SubmissionSchema = SchemaFactory.createForClass(Submission)