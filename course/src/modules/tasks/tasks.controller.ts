import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskDto } from './dtos/tasks.dto';
import { TasksService } from './tasks.service';
import { RequireAdminGuard } from 'src/guards/requireAdmin';

@Controller('')
export class TasksController {
constructor(private taskService:TasksService){}
    @Post('/addTask')
   async addTask(@Body() payload:TaskDto){
    return this.taskService.addTask(payload)
   }
    

   @Get('/getTodayTask')
   @UseGuards(RequireAdminGuard)
  async getTodaysTask(){
      return await this.taskService.getTodaysTasks()
   }

 
}
