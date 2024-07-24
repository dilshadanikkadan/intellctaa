import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/databse/models/category.model';
import { categoryDTO } from './dtos/categoryDto';
import { TOBE } from 'src/services/constants/Tobe';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private courseModel: Model<Category>,
  ) {}

  async createCategory(payload: categoryDTO): Promise<any> {
    const newCategory = new this.courseModel({
      ...payload,
    });
    return await newCategory.save();
  }

  async getAllCategory(): Promise<any> {
    return await this.courseModel.find();
  }

  async deleteCategory(id: string): Promise<any> {
    return await this.courseModel.findByIdAndDelete(id);
  }
  async updateCategory(payload: TOBE): Promise<any> {
    return await this.courseModel.findByIdAndUpdate(payload.id, {
      $set: {
        ...payload,
      },
    });
  }
}
