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

  async getMySubmission(payload: any) {
    const { id, userId } = payload;
    console.log("_______",payload);
    
    const query = await this.submissionModel.aggregate([
      {
        $match: {
          $and: [{ userId: userId }, { problemName: id }],
        },
      },
    ]);
    return query
  }
  

  async manageLike(payload:any){
    const {userId,submissionId}:any= payload;
    console.log("________#",payload);
    const submission = await this.submissionModel.findById(submissionId);
    console.log("________",submission);
    
    const isLiked = submission?.likes.includes(userId as never) ;
    if(isLiked){
      return await this.submissionModel.findByIdAndUpdate(submissionId,{
        $pull:{likes:userId}
      })
    }else{
      return await this.submissionModel.findByIdAndUpdate(submissionId,{
        $push:{likes:userId}
      })
    }

  }

  async getAttencence(userId){
     const totalSubmission = await this.submissionModel.aggregate([
       {
        $match:{
          userId
        }
       },

       {
        $project:{
          totalSubmission:  {$dateToString:{ format: "%Y-%m-%d", date: "$submittedAt" } },
          userId:1,
          problemName:1
        }
       },
       {
        $group: {
         _id: "$totalSubmission",
         submissionByDate: { $push: "$$ROOT" },
        },
       },
     ])  
     return totalSubmission 
  }

  async myAllSumbittedProblems(userId:string){
    const query=  await this.submissionModel.find({userId}).select("problemName")

    return query.map((x)=> x.problemName)
  }
}
