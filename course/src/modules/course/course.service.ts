import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Course } from 'src/databse/models/course.model';
import { courseAddDTO } from './dtos/course.add.dto';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async createCourse(courseAddDto: courseAddDTO) {
    const newCourse = new this.courseModel(courseAddDto);
    return newCourse.save();
  }

  async allCourse(payload) {
    const { _limit, _page } = payload;
    console.log('____________________________________-', payload);

    const limit = parseInt(_limit, 10) || 5;
    const pageNumber = parseInt(_page, 10) || 1;
    const skip = (pageNumber - 1) * limit;
    const courses = await this.courseModel.find().skip(skip).limit(limit);
    const totalCount = await this.courseModel.countDocuments();
    return {
      courses: courses,
      totalCount: totalCount,
    };
  }

  async getSingleCourse(id: string) {
    return await this.courseModel.findById(id).populate('instructor');
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

  async getAllPublishedCourses(payload) {
    const { _search, _Category, _limit, _page } = payload;

    const limit = parseInt(_limit, 10) || 5;
    const pageNumber = parseInt(_page, 10) || 1;
    const skip = (pageNumber - 1) * limit;
    if (_search) {
      const regex = new RegExp(_search, 'i');
      const courses = await this.courseModel.find({
        title: { $regex: regex },
        isPublished: true,
      });
      return {
        courses: courses,
      };
    } else if (_Category && _Category !== 'All') {
      console.log('___________________-');
      console.log(_Category);
      console.log('___________________-');

      const courses = await this.courseModel.find({
        category: _Category,
        isPublished: true,
      });
      return {
        courses: courses,
      };
    } else {
      const courses = await this.courseModel
        .find({ isPublished: true })
        .skip(skip)
        .limit(limit);
      const totalCount = (await this.courseModel.find({ isPublished: true }))
        .length;
      return {
        courses: courses,
        totalCount: totalCount,
      };
    }
  }

  async getInstructorCourse(id: any) {
    const objectId = new mongoose.Types.ObjectId(id);
    console.log(mongoose.isValidObjectId(id), 'checking is valid or not');

    const res = await this.courseModel.find({ instructor: id });
    console.log('_______________', objectId);
    if (res.length === 0) {
      const newRes = await this.courseModel.find({ instructor: objectId });

      return newRes;
    } else {
      return res;
    }
  }
  async updateCourse(payload: any) {
    try {
      const { id, updatedCourse } = payload;

      const { _id, __v, thumbnailPreview, ...cleanedCourse } = updatedCourse;

      if (
        Array.isArray(cleanedCourse.lessons) &&
        cleanedCourse.lessons.length > 0
      ) {
        cleanedCourse.lessons = cleanedCourse.lessons.flat();
      }

      if (
        cleanedCourse.instructor &&
        typeof cleanedCourse.instructor === 'string'
      ) {
        cleanedCourse.instructor = new Types.ObjectId(cleanedCourse.instructor);
      }

      const updatedDoc = await this.courseModel.findByIdAndUpdate(
        id,
        { $set: cleanedCourse },
        { new: true, runValidators: true },
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

  async rejectCourse(id: any) {
    return await this.courseModel.findByIdAndUpdate(id, { isRejected: true });
  }

  async deleteCourse(id: string) {
    return await this.courseModel.findByIdAndDelete(id);
  }
}
