import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { SubmissionDto } from './dtos/submission.dto';
import { Response, Request } from 'express';
import { TOBE } from 'src/services/constants/Tobe';
import { RequireUserGuard } from 'src/guards/requireUser';

@Controller('')
export class SubmissionController {
  constructor(private submissionService: SubmissionService) {}

  @Post('/addSubmission')
  @UseGuards(RequireUserGuard)
  public async addSubmission(@Body() payload: SubmissionDto) {
    try {
      return await this.submissionService.createSubmission(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/getSubmission/:id')
  @UseGuards(RequireUserGuard)
  public async getSubmission(@Param() param: string) {
    try {
      const { id }: TOBE = param;
      return await this.submissionService.getSubmission(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/getMySubmission/:id')
  @UseGuards(RequireUserGuard)
  public async getSubmitted(@Param() param: string, @Req() req: Request) {
    try {
      const { id }: TOBE = param;
      const userId = req.cookies.session_id;
      console.log('___________________________');
      console.log(userId);
      console.log('___________________________');

      return await this.submissionService.getMySubmission({ id, userId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/like')
  @UseGuards(RequireUserGuard)
  public async likeManage(@Body() payload: string, @Req() req: Request) {
    try {
      const { submissionId }: TOBE = payload;

      const userId = req.cookies.session_id;

      return await this.submissionService.manageLike({ userId, submissionId });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/getAttendence/:id')
  public async getAttendence(@Param() param: string) {
    try {
      const { id }: TOBE = param;

      return await this.submissionService.getAttencence(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/myAllSumbittedProblems/:id')
  public async myAllSumbittedProblems(@Param() param: string) {
    try {
      const { id }: TOBE = param;
      return await this.submissionService.myAllSumbittedProblems(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('leaderBoard')
  public async leaderBoard() {
    try {
        return await this.submissionService.leaderBoard()
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
  @Get('/getMylikes/:id')
  public async getMylikes(@Param() param: string) {
    const { id }: TOBE = param;

    try {
        return await this.submissionService.getLikes(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
