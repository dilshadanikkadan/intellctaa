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
import { EntrollmentService } from './entrollment.service';
import { Response, Request } from 'express';
import { RequireUserGuard } from 'src/guards/requireUser';
import { TOBE } from 'src/services/constants/Tobe';
@Controller('')
export class EntrollmentController {
  constructor(private entrollmentService: EntrollmentService) {}

  @Get('getMyCourse/:id')
  @UseGuards(RequireUserGuard)
  public async getEntrollCourse(@Param() params: string, @Req() req: Request) {
    try {
      const { id }: TOBE = params;
      const userId = req.cookies.session_id;
      const response = await this.entrollmentService.getMyCourse({
        id,
        userId,
      });
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/updateProgress')
  @UseGuards(RequireUserGuard)
  public async updateProgress(@Body() payload: TOBE) {
    try {
      return await this.entrollmentService.updateProgress(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/myEntrolledCourse/:id')
  @UseGuards(RequireUserGuard)
  public async course(@Param() param: string) {
    try {
      const { id }: TOBE = param;
      return await this.entrollmentService.myEntrolledCourse(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/getEntrollAnalatytics/')
  public async getEntrollAnalatytics() {
    try {
      return await this.entrollmentService.getEntrollAnalatytics();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  @Get('/getInstructorOwnAnalytics/:id')
  public async getInstructorOwnAnalytics(@Param() param: string) {
    try {
      const { id }: TOBE = param;
      return await this.entrollmentService.getInstructorOwnAnalytics(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
