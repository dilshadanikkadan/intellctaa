import { Body, Controller, Post } from '@nestjs/common';
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
}
