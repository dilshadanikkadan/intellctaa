import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/databse/models/course.model';
import { courseAddDTO } from './dtos/course.add.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

    async createCourse(courseAddDto:courseAddDTO){
       const newCourse = new this.courseModel(courseAddDto)
      return newCourse.save()
    }
}
