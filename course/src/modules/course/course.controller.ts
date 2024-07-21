import {
  BadRequestException,
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
import { TOBE } from 'src/services/constants/Tobe';

@Controller('')
export class CourseController {
  constructor(private courseService: CourseService) {}
  @Post('/addCourse')
  @UseGuards(RequireUserGuard)
  addCourse(@Body() coursePayload: courseAddDTO) {
    try {
      return this.courseService.createCourse(coursePayload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/getAllCourses')
  public getAllCourses(
    @Query() query: GetAllCoursesQueryDto,
    @Req() req: Request,
  ): Promise<TOBE> {
    try {
      return this.courseService.allCourse(query);
    } catch (error) {
      throw error;
    }
  }

  @Get('/getAllPublishedCourses')
  getAllPublishedCourses(@Query() query: GetAllPublishCoursesQueryDto) {
    try {
      return this.courseService.getAllPublishedCourses(query);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('courses/:id')
  getSingleCourse(@Param() params: string) {
    try {
      const { id }: TOBE = params;
      return this.courseService.getSingleCourse(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/publish')
  @UseGuards(RequireUserGuard)
  public async publishCourse(@Body() payload: string): Promise<TOBE> {
    const { id }: TOBE = payload;
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
  public async getInstroctorCourse(@Param() param: string) {
    try {
      const { id }: TOBE = param;
      return await this.courseService.getInstructorCourse(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/updateCourse')
  @UseGuards(RequireUserGuard)
  public async updateCourse(@Body() payload: TOBE) {
    console.log('*********************', payload);
    try {
      const response = await this.courseService.updateCourse(payload);
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/rejectCourse')
  @UseGuards(RequireUserGuard)
  public async rejectCourse(@Body() payload: TOBE) {
    try {
      const { courseId } = payload;
      const response = await this.courseService.rejectCourse(courseId);
      return response;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post('/deleteCourse')
  @UseGuards(RequireUserGuard)
  async deleteCourse(@Body() param: TOBE) {
    try {
      const { id } = param;
      return await this.courseService.deleteCourse(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
