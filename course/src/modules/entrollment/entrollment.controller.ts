import { Controller, Get, Param, Req } from '@nestjs/common';
import { EntrollmentService } from './entrollment.service';
import { Response ,Request} from 'express';
@Controller('')
export class EntrollmentController {
  constructor(private entrollmentService: EntrollmentService) {}
  @Get('getMyCourse/:id')
  async getEntrollCourse(@Param() params: string,@Req() req:Request) {
    const { id }: any = params;
     const  userId =req.cookies.session_id
    const response = await this.entrollmentService.getMyCourse({ id,userId });
    return response;
  }
}
 