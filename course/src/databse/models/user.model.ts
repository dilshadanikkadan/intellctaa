import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class SocialMedia {
  @Prop()
  instagram: string;

  @Prop()
  linkedIn: string;

  @Prop()
  github: string;
}

@Schema()
class Contact {
  @Prop()
  additionalEmail: string;

  @Prop()
  phone: string;

  @Prop()
  socialMedia: SocialMedia;
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ type: String, enum: ['student', 'instructor', 'admin'], default: 'student' })
  role: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  profile: string;

  @Prop()
  contact: Contact;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop({ default: false })
  isAuth: boolean;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: false })
  isInstructor: boolean;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  profession: string;

  @Prop()
  otp: string;

  @Prop()
  otpExp: number;

  @Prop()
  refreshToken: string;

  @Prop({ default: 0 })
  profit: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.statics.build = (attrs: User) => {
  return new User(attrs);
};