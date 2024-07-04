import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CourseDoc = HydratedDocument<Course>;
export type LessonDoc = HydratedDocument<Lesson>;

@Schema()
export class Lesson {
  @Prop({ type: String, required: true })
  lessonNumber: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  video: string;

  @Prop()
  thumbnail: string;
   
  @Prop({ type: String })
  duration: string;

  @Prop({ type: [String] ,default:[]})
  objectives: string[];

  @Prop({type:[String],default:[]})
  problems:string[];
}  

export const LessonSchema = SchemaFactory.createForClass(Lesson);

@Schema()
export class Course {
  @Prop({type:String})
  title: string;
   
  @Prop({type:String})
  instructor:string

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop()
  language: string;

  @Prop()
  thumbnail: string;

  @Prop()
  trailer: string;
  
  @Prop({type:Boolean,default:false})
  isPublished:boolean;

  @Prop({type:Boolean,default:false})
  isRequested:boolean;

  
  @Prop({type:Boolean,default:false})
  isRejected:boolean;

  @Prop({ type: [LessonSchema], default: [] })
  lessons: Lesson[];
   

}

export const CourseSchmea = SchemaFactory.createForClass(Course);
