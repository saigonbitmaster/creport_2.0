import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.model.find().exec();
  }
  /*  async findOne(id: string): Promise<User> {
    return await this.model.findById(id).exec();
  } */

  async findAllRaw(filter = {}): Promise<any[]> {
    return this.model.find(filter).exec();
  }

  async findById(id: string): Promise<any> {
    return await this.model.findById(id).exec();
  }

  async findOne(username: string): Promise<User> {
    const [user] = await this.model.find({ username: username }).exec();
    return user;
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const username = createUserDto.username.toLowerCase();
    const saltOrRounds = 10;
    const password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    return await new this.model({
      ...createUserDto,
      username,
      password,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let _updateUserDto = updateUserDto;
    if (updateUserDto.password) {
      const saltOrRounds = 10;
      const password = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      _updateUserDto = { ...updateUserDto, password };
    }
    return await this.model.findByIdAndUpdate(id, _updateUserDto).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
