import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskDto } from './dtos/tasks.dto';
import { TasksService } from './tasks.service';

@Controller('')
export class TasksController {
constructor(private taskService:TasksService){}
    @Post('/addTask')
   async addTask(@Body() payload:TaskDto){
    return this.taskService.addTask(payload)
   }
    

   @Get('/getTodayTask')
  async getTodaysTask(){
      return await this.taskService.getTodaysTasks()
   }
}
