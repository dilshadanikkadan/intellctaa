import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CategoryDoc = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: String })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
