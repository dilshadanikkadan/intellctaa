import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { courseAddDTO } from './dtos/course.add.dto';
import { CourseService } from './course.service';
import { RequireAdminGuard } from 'src/guards/requireAdmin';
import { RequireUserGuard } from 'src/guards/requireUser';

@Controller('')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @Post('/addCourse')
  @UseGuards(RequireUserGuard)
  addCourse(@Body() coursePayload: courseAddDTO) {
    return this.courseService.createCourse(coursePayload);
  }

  @Get('/getAllCourses')
  getAllCourses() {
    return this.courseService.allCourse();
  } 

  @Get('/getAllPublishedCourses')
  @UseGuards(RequireAdminGuard)

  getAllPublishedCourses() {
    return this.courseService.getAllPublishedCourses();
  }

  @Get('courses/:id')
  getSingleCourse(@Param() params: string) {
    const { id }: any = params;
    return this.courseService.getSingleCourse(id);
  }

  @Post('/publish')
  publishCourse(@Body() payload: string) {
    const { id }: any = payload;
    return this.courseService.publishCourse(id);
  }

  @Get('/getInstroctorCourse/:id')
  async getInstroctorCourse(@Param() param: string) {
    const { id }: any = param;
    return await this.courseService.getInstructorCourse(id);
  }

  @Post('/updateCourse')
  @UseGuards(RequireUserGuard)
  async updateCourse(@Body() payload: any) {
    console.log('*********************', payload);

    const response = await this.courseService.updateCourse(payload);
    return response;
  }
  @Post('/rejectCourse')
  @UseGuards(RequireUserGuard)
  async rejectCourse(@Body() payload: any) {
    const { courseId } = payload;
    const response = await this.courseService.rejectCourse(courseId);
    return response;
  }
}
