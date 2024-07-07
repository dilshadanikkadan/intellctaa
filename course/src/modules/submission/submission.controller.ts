import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionDto } from './dtos/submission.dto';

@Controller('')
export class SubmissionController {
    constructor(private submissionService:SubmissionService){}


    @Post('/addSubmission')
    async addSubmission(@Body() payload:SubmissionDto){
      return await this.submissionService.createSubmission(payload)
    }

    @Get('/getSubmission/:id')
    async getSubmission(@Param()  param:string){
      const { id}:any = param;
      return await this.submissionService.getSubmission(id)
    }
}
