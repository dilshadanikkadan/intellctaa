import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/databse/models/course.model';
import { courseAddDTO } from './dtos/course.add.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(courseAddDto: courseAddDTO) {
    const newCourse = new this.courseModel(courseAddDto);
    return newCourse.save();
  }

  async allCourse() {
    return await this.courseModel.find();
  }

  async getSingleCourse(id: string) {
    return await this.courseModel.findById(id);
  }

  async publishCourse(id: string) {
    return await this.courseModel.findByIdAndUpdate(
      id,
      {
        $set: { isPublished: true, isRequested: true },
      },
      { new: true },
    );
  }

  async getAllPublishedCourses() {
    return await this.courseModel.find({ isPublished: true });
  }

  async getInstroctorCourse(id:any) {
    return await this.courseModel.find({ instructor: id });
  }
}
