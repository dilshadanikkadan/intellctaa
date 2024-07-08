import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { courseAddDTO } from './dtos/course.add.dto';
import { CourseService } from './course.service';

@Controller('')
export class CourseController {
    constructor(private courseService:CourseService){}
    @Post('/addCourse')
    addCourse(@Body() coursePayload:courseAddDTO){
        // return "hey"
       return this.courseService.createCourse(coursePayload)
         
    }

    @Get('/getAllCourses')
    getAllCourses(){
        return this.courseService.allCourse()
    }

    @Get('/getAllPublishedCourses')
    getAllPublishedCourses(){
        return this.courseService.getAllPublishedCourses()
    }

    @Get('courses/:id')
    getSingleCourse(@Param() params:string ){
        const {id}:any= params
        return this.courseService.getSingleCourse(id)
    }

    @Post('/publish')
    publishCourse(@Body() payload:string ){
       const {id}:any = payload;
        return this.courseService.publishCourse(id)
    }

    @Get('/getInstroctorCourse/:id')
    async getInstroctorCourse(@Param() param:string){
        const {id}:any = param
        return await this.courseService.getInstroctorCourse(id)
    }
}
