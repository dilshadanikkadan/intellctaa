import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Enrollment } from 'src/databse/models/entrollment.model';
import { TOBE } from 'src/services/constants/Tobe';

@Injectable()
export class EntrollmentService {
  constructor(
    @InjectModel(Enrollment.name) private entrollmentModel: Model<Enrollment>,
  ) {}
  @OnEvent('entroll.saved')
  async saveEntroll(payload) {
    const newEntroll = new this.entrollmentModel({
      ...payload,
    });

    await newEntroll.save();
  }

  async getMyCourse(payload: { id: string; userId: string }) {
    const { id, userId } = payload;
    console.log('________________________________', payload);

    const isEnrolled = await this.entrollmentModel.aggregate([
      {
        $match: {
          $and: [{ userId: userId }, { courseId: id }],
        },
      },
    ]);

    if (isEnrolled.length === 0) {
      throw new NotFoundException('Enrollment not found');
    }

    return isEnrolled[0];
  }

  async updateProgress(payload: any) {
    const { courseId, userId, lessonId } = payload;

    const update = await this.entrollmentModel.findOneAndUpdate(
      { $and: [{ userId }, { courseId }] },
      {
        $addToSet: { 'progress.completedLessons': lessonId },
      },
      { new: true },
    );
    return update;
  }

  async myEntrolledCourse(userId: mongoose.Types.ObjectId) {
    const query_MyEntrollment = await this.entrollmentModel
      .find({ userId })
      .populate('courseId');
    if (!query_MyEntrollment)
      throw new BadRequestException('Enntrollment not found ');
    return query_MyEntrollment;
  }

  async getEntrollAnalatytics() {
    const date = new Date();
    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const previousMonth = new Date(lastMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const data = await this.entrollmentModel.aggregate([
      {
        $match: {
          enrolledAt: {
            $gte: previousMonth,
          },
        },
      },
      {
        $group: {
          _id: { $month: '$enrolledAt' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          count: 1,
        },
      },
    ]);
    return data;
  }

  async getInstructorOwnAnalytics(id: TOBE): Promise<TOBE> {
    const date = new Date();
    const lastMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const previousMonth = new Date(lastMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const instructorId = new mongoose.Types.ObjectId(id);
    const data = await this.entrollmentModel.aggregate([
      {
        $lookup: {
          from: 'courses',
          let: { courseId: { $toObjectId: '$courseId' } },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$courseId'] },
              },
            },
          ],
          as: 'coursesData',
        },
      },
      {
        $unwind: '$coursesData',
      },
      {
        $match: {
          $and: [
            {
              'coursesData.instructor': instructorId,
            },
            {
              enrolledAt: {
                $gte: previousMonth,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: { $month: '$enrolledAt' },
          count: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          count: 1,
          profit: { $multiply: ['$totalAmount', 0.8] },
        },
      },
    ]);
    return data;
  }

  async getInstructorTrendCourse(id: string): Promise<any> {
    const instructorId = new mongoose.Types.ObjectId(id);
    const data = await this.entrollmentModel.aggregate([
      {
        $lookup: {
          from: 'courses',
          let: { courseId: { $toObjectId: '$courseId' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$_id', '$$courseId'] },
                    { $eq: ['$instructor', instructorId] },
                  ],
                },
              },
            },
          ],
          as: 'coursesData',
        },
      },
      {
        $unwind: '$coursesData',
      },
      {
        $group: {
          _id: '$coursesData._id',
          courseTitle: { $first: '$coursesData' },
          enrollmentCount: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: { enrollmentCount: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    return data;
  }
  async getTrendingCourses(): Promise<TOBE> {
    const data = await this.entrollmentModel.aggregate([
      {
        $lookup: {
          from: 'courses',
          let: { courseId: { $toObjectId: '$courseId' } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ['$_id', '$$courseId'] }],
                },
              },
            },
          ],
          as: 'coursesData',
        },
      },
      {
        $unwind: '$coursesData',
      },
      {
        $group: {
          _id: '$coursesData._id',
          coursesData: { $first: '$coursesData' },
          enrollmentCount: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $sort: { enrollmentCount: -1 },
      },
      {
        $limit: 4,
      },
    ]);
    return data;
  }
}
