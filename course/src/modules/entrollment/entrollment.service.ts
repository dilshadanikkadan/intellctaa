import { Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Enrollment } from 'src/databse/models/entrollment.model';

@Injectable()
export class EntrollmentService {
    constructor(@InjectModel(Enrollment.name) private entrollmentModel:Model<Enrollment>){}
    @OnEvent('entroll.saved')
    async saveEntroll(payload){
         const newEntroll = new this.entrollmentModel({
            ...payload,
         })

       await  newEntroll.save()
    }

    async getMyCourse(payload: { id: string; userId: string }) {
      const { id, userId } = payload;
    
      const isEnrolled = await this.entrollmentModel.aggregate([
        {
          $match: {
            $and: [
              { userId: userId },
              { courseId: id}
            ]
          }
        },
   
      ]);
    
      if (isEnrolled.length === 0) {
        throw new NotFoundException('Enrollment not found');
      }
    
      return isEnrolled[0]; 
    }
}
