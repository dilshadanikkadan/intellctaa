import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/databse/models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  @OnEvent('user.saved')
  async saveuser(payload) {
    const newUser = new this.userModel({
      ...payload,
    });

    await newUser.save()
  }
}
