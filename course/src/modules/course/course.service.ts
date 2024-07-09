import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async getInstroctorCourse(id: any) {
    return await this.courseModel.find({ instructor: id });
  }
  async updateCourse(payload: any) {
    try {
      const { id, updatedCourse } = payload;
  
      const {
        _id,
        __v,
        thumbnailPreview,
        ...cleanedCourse
      } = updatedCourse;
  
      if (Array.isArray(cleanedCourse.lessons) && cleanedCourse.lessons.length > 0) {
        cleanedCourse.lessons = cleanedCourse.lessons.flat();
      }
  
      if (cleanedCourse.instructor && typeof cleanedCourse.instructor === 'string') {
        cleanedCourse.instructor = new Types.ObjectId(cleanedCourse.instructor);
      }
  
      const updatedDoc = await this.courseModel.findByIdAndUpdate(
        id,
        { $set: cleanedCourse },
        { new: true, runValidators: true }
      );
  
      if (!updatedDoc) {
        throw new Error('Course not found');
      }
  
      return updatedDoc;
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  }

  async rejectCourse(id:any){
    return await this.courseModel.findByIdAndUpdate(id,{isRejected:true})
  }
}
