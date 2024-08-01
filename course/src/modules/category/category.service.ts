import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/databse/models/category.model';
import { categoryDTO } from './dtos/categoryDto';
import { TOBE } from 'src/services/constants/Tobe';
import { BadRequestError } from '@intellectaa/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private courseModel: Model<Category>,
  ) {}

  async createCategory(payload: categoryDTO): Promise<TOBE> {
    const newCategory = new this.courseModel({
      ...payload,
    });
    const allCat = await this.courseModel.find();
    const newCat = allCat.map((item) => {
      return item.title.toLowerCase();
    });
    console.log("all cat",newCat);
    console.log("payload title",payload.title);
    
    if (newCat.includes(payload.title.toLowerCase() as any)) {
      throw new BadRequestException('category already Exist');
    } else {
      return await newCategory.save();
    }
  }

  async getAllCategory(): Promise<TOBE> {
    return await this.courseModel.find();
  }

  async deleteCategory(id: string): Promise<TOBE> {
    return await this.courseModel.findByIdAndDelete(id);
  }

  async updateCategory(payload: TOBE): Promise<TOBE> {
    return await this.courseModel.findByIdAndUpdate(payload.id, {
      $set: {
        ...payload,
      },
    });
  }
}
