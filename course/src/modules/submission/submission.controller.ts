import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionDto } from './dtos/submission.dto';
import { Response, Request } from 'express';

@Controller('')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Post('/addSubmission')
  async addSubmission(@Body() payload: SubmissionDto) {
    return await this.submissionService.createSubmission(payload);
  }

  @Get('/getSubmission/:id')
  async getSubmission(@Param() param: string) {
    const { id }: any = param;
    return await this.submissionService.getSubmission(id);
  }

  @Get('/getMySubmission/:id')
  async getSubmitted(@Param() param: string, @Req() req: Request) {
    const { id }: any = param;
    const userId = req.cookies.session_id;
    console.log('___________________________');
    console.log(userId);
    console.log('___________________________');

    return await this.submissionService.getMySubmission({ id, userId });
  }

  @Post('/like')
  async likeManage(@Body() payload: string, @Req() req: Request) {
    const { submissionId }: any = payload;
    const userId = req.cookies.session_id;

    return await this.submissionService.manageLike({ userId, submissionId });
  }

  @Get('/getAttendence/:id')
  async getAttendence(@Param() param: string) {
    const { id }: any = param;

    return await this.submissionService.getAttencence(id);
  }

  @Get('/myAllSumbittedProblems/:id')
  async myAllSumbittedProblems(@Param() param: string) {
    const { id }: any = param;
    return await this.submissionService.myAllSumbittedProblems(id);
  }
}
