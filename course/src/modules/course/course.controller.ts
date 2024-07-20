import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { courseAddDTO } from './dtos/course.add.dto';
import { CourseService } from './course.service';
import { RequireAdminGuard } from 'src/guards/requireAdmin';
import { RequireUserGuard } from 'src/guards/requireUser';
import {
  ChatCreatedBatch,
  courseProducer,
} from 'src/kafka/producer/base.producer';
import { Request } from 'express';
import {
  GetAllCoursesQueryDto,
  GetAllPublishCoursesQueryDto,
} from './dtos/queury.dto';

@Controller('')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @Post('/addCourse')
  @UseGuards(RequireUserGuard)
  addCourse(@Body() coursePayload: courseAddDTO) {
    return this.courseService.createCourse(coursePayload);
  }

  @Get('/getAllCourses')
  public getAllCourses(
    @Query() query: GetAllCoursesQueryDto,
    @Req() req: Request,
  ): Promise<any> {
    try {
      return this.courseService.allCourse(query);
    } catch (error) {
      throw error;
    }
  }

  @Get('/getAllPublishedCourses')
  getAllPublishedCourses(@Query() query: GetAllPublishCoursesQueryDto) {
    return this.courseService.getAllPublishedCourses(query);
  }

  @Get('courses/:id')
  getSingleCourse(@Param() params: string) {
    const { id }: any = params;
    return this.courseService.getSingleCourse(id);
  }

  @Post('/publish')
  public async publishCourse(@Body() payload: string): Promise<any> {
    const { id }: any = payload;
    try {
      const course = await this.courseService.publishCourse(id);
      const payload = {
        roomCreater: course?._id,
        partcipants: [course?.instructor],
        lastMessage: '',
        roomName: course?.title,
        roomProfile: course?.thumbnail,
      };
      courseProducer.produceAll(
        {
          payload,
        },
        ChatCreatedBatch(payload),
      );
      return course;
    } catch (error) {}
  }

  @Get('/getInstroctorCourse/:id')
  async getInstroctorCourse(@Param() param: string) {
    const { id }: any = param;
    return await this.courseService.getInstructorCourse(id);
  }

  @Post('/updateCourse')
  // @UseGuards(RequireUserGuard)
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

  @Post('/deleteCourse')
  async deleteCourse(@Body() param: any) {
    const { id } = param;
    return await this.courseService.deleteCourse(id);
  }
}
