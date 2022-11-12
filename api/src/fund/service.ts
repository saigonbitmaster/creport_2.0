import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFundDto } from './dto/create.dto';
import { UpdateFundDto } from './dto/update.dto';
import { Fund, FundDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class FundService {
  constructor(
    @InjectModel(Fund.name) private readonly model: Model<FundDocument>,
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

  async findById(id: string): Promise<Fund> {
    return await this.model.findById(id).exec();
  }

  async findByName(name: string): Promise<Fund> {
    return await this.model.findOne({ name: name }).exec();
  }

  async create(createFundDto: CreateFundDto): Promise<Fund> {
    return await new this.model({
      ...createFundDto,
      createdAt: new Date(),
    }).save();
  }

  async import(funds: CreateFundDto[]): Promise<any> {
    return funds.forEach(async (fund) => {
      await this.model.findOneAndUpdate({ name: fund.name }, fund, {
        new: true,
        upsert: true,
      });
    });
  }

  async update(id: string, updateFundDto: UpdateFundDto): Promise<Fund> {
    return await this.model.findByIdAndUpdate(id, updateFundDto).exec();
  }

  async delete(id: string): Promise<Fund> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
