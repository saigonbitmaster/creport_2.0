import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFundDto } from './dto/create.dto';
import { UpdateFundDto } from './dto/update.dto';
import { Fund, FundDocument } from './schemas/schema';
import { raList } from '../types';

@Injectable()
export class FundService {
  constructor(
    @InjectModel(Fund.name) private readonly model: Model<FundDocument>,
  ) {}

  async findAll(filter, sort, skip, limit): Promise<raList> {
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

  async findOne(id: string): Promise<Fund> {
    return await this.model.findById(id).exec();
  }

  async create(createFundDto: CreateFundDto): Promise<Fund> {
    return await new this.model({
      ...createFundDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateFundDto: UpdateFundDto): Promise<Fund> {
    return await this.model.findByIdAndUpdate(id, updateFundDto).exec();
  }

  async delete(id: string): Promise<Fund> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
