import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { TaskDto } from './dtos/tasks.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/databse/models/tasks.model';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async addTask(payload: TaskDto) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingTask = await this.taskModel.findOne({
      createdAt: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingTask) {
      throw new ConflictException('A task is already assigned for today');
    }

    const newTask = new this.taskModel({
      ...payload,
      createdAt: new Date() 
    });

    return await newTask.save();
  }

  async getTodaysTasks() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysTasks = await this.taskModel.findOne({
      createdAt: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (!todaysTasks) {
      throw new NotFoundException('No tasks found for today');
    }

    return todaysTasks;
  }


}