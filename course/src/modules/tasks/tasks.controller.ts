import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskDto } from './dtos/tasks.dto';
import { TasksService } from './tasks.service';
import { RequireAdminGuard } from 'src/guards/requireAdmin';

@Controller('')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Post('/addTask')
  public async addTask(@Body() payload: TaskDto) {
    try {
      return this.taskService.addTask(payload);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('/getTodayTask')
  public async getTodaysTask() {
    try {
      return await this.taskService.getTodaysTasks();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
