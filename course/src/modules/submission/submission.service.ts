import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from 'src/databse/models/submission.model';
import { SubmissionDto } from './dtos/submission.dto';
import { TOBE } from 'src/services/constants/Tobe';
import { profile } from 'console';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async createSubmission(payload: SubmissionDto) {
    const { problem, ...rest } = payload;
    const newSubmisson = new this.submissionModel({
      ...rest,
      problem: btoa(problem),
    });
    return await newSubmisson.save();
  }

  async getSubmission(questionName: string) {
    const query = await this.submissionModel
      .find({ problemName: questionName })
      .populate('userId');
    return query;
  }

  async getMySubmission(payload: TOBE) {
    const { id, userId } = payload;
    console.log('_______', payload);

    const query = await this.submissionModel.aggregate([
      {
        $match: {
          $and: [{ userId: userId }, { problemName: id }],
        },
      },
    ]);
    return query;
  }

  async manageLike(payload: TOBE) {
    const { userId, submissionId }: TOBE = payload;
    console.log('________#', payload);
    const submission = await this.submissionModel.findById(submissionId);
    console.log('________', submission);

    const isLiked = submission?.likes.includes(userId as never);
    if (isLiked) {
      return await this.submissionModel.findByIdAndUpdate(submissionId, {
        $pull: { likes: userId },
      });
    } else {
      return await this.submissionModel.findByIdAndUpdate(submissionId, {
        $push: { likes: userId },
      });
    }
  }

  async getAttencence(userId: TOBE) {
    const totalSubmission = await this.submissionModel.aggregate([
      {
        $match: {
          userId,
        },
      },

      {
        $project: {
          totalSubmission: {
            $dateToString: { format: '%Y-%m-%d', date: '$submittedAt' },
          },
          userId: 1,
          problemName: 1,
        },
      },
      {
        $group: {
          _id: '$totalSubmission',
          submissionByDate: { $push: '$$ROOT' },
        },
      },
    ]);
    return totalSubmission;
  }

  async myAllSumbittedProblems(userId: string): Promise<TOBE> {
    const query = await this.submissionModel
      .find({ userId })
      .select('problemName');

    return query.map((x) => x.problemName);
  }

  async leaderBoard(): Promise<any> {
    return this.submissionModel
      .aggregate([
        {
          $group: {
            _id: '$userId',
            totalSubmissions: { $sum: 1 },
            totalLikes: { $sum: { $size: '$likes' } },
          },
        },
        {
          $lookup: {
            from: 'users',
            let: { userId: { $toObjectId: '$_id' } },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ['$_id', '$$userId'] },
                },
              },
            ],
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            _id: 0,
            userId: '$_id',
            totalSubmissions: 1,
            totalLikes: 1,
            userName: '$user.username',
            profile: '$user.profile',
          },
        },
        {
          $sort: { totalSubmissions: -1, totalLikes: -1 },
        },
      ])
      .exec();
  }
}
