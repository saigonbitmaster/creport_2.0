import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengeDto } from './dto/create.dto';
import { UpdateChallengeDto } from './dto/update.dto';
import { Challenge, ChallengeDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { FundService } from '../fund/service';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel(Challenge.name)
    private readonly model: Model<ChallengeDocument>,
    private readonly fundService: FundService,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();
    const result = { count: count, data: data };
    return result;
  }

  async findOne(id: string): Promise<Challenge> {
    return await this.model.findById(id).exec();
  }

  async import(challenges: CreateChallengeDto[]): Promise<any> {
    return challenges.forEach(async (challenge) => {
      await this.model.findOneAndUpdate({ name: challenge.name }, challenge, {
        new: true,
        upsert: true,
      });
    });
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
