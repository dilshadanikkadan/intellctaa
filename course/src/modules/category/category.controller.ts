import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { categoryDTO } from './dtos/categoryDto';
import { TOBE } from 'src/services/constants/Tobe';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  public async addCategory(@Body() categoryDTO: categoryDTO): Promise<any> {
    try {
      return await this.categoryService.createCategory(categoryDTO);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  public async getAllCategory(): Promise<any> {
    try {
      return await this.categoryService.getAllCategory();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put()
  public async updateCategory(@Body() payload: TOBE): Promise<any> {
    try {
      return await this.categoryService.updateCategory(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Delete(':id')
  public async deleteCategory(@Param('id') id: string): Promise<any> {
    try {
      return await this.categoryService.deleteCategory(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
