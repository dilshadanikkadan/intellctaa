import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchmea } from 'src/databse/models/course.model';

@Module({
  imports:[MongooseModule.forFeature([{name:Course.name,schema:CourseSchmea}])],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
