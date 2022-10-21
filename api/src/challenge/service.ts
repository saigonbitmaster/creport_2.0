import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengeDto } from './dto/create.dto';
import { UpdateChallengeDto } from './dto/update.dto';
import { Challenge, ChallengeDocument } from './schemas/schema';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel(Challenge.name)
    private readonly model: Model<ChallengeDocument>,
  ) {}

  async findAll(filter, sort, skip, limit): Promise<any> {
    const count = await this.model.find(filter).count().exec();
    const data = await this.model
      .find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
    const result = { count: count, data: data };
    return result;
  }

  async customMethod(title: string, description: string): Promise<Challenge[]> {
    return await this.model
      .aggregate([{ $match: { title: title, description: description } }])
      .exec();
  }
  async findOne(id: string): Promise<Challenge> {
    return await this.model.findById(id).exec();
  }

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    return await new this.model({
      ...createChallengeDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    return await this.model.findByIdAndUpdate(id, updateChallengeDto).exec();
  }

  async delete(id: string): Promise<Challenge> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}