import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Submission } from 'src/databse/models/submission.model';
import { SubmissionDto } from './dtos/submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async createSubmission(payload: SubmissionDto) {
    const {problem,...rest}= payload
    const newSubmisson = new this.submissionModel({
      ...rest,
      problem:btoa(problem)
    });
    return await newSubmisson.save();
  }

  async getSubmission(questionName:string){
     const query=await this.submissionModel.find({problemName:questionName}).populate("userId")
     return query;
  }
} 
