import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProposerDto } from './dto/create.dto';
import { UpdateProposerDto } from './dto/update.dto';
import { Proposer, ProposerDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class ProposerService {
  constructor(
    @InjectModel(Proposer.name) private readonly model: Model<ProposerDocument>,
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

  async findOne(id: string): Promise<Proposer> {
    return await this.model.findById(id).exec();
  }

  async create(createProposerDto: CreateProposerDto): Promise<Proposer> {
    return await new this.model({
      ...createProposerDto,
      createdAt: new Date(),
    }).save();
  }

  async import(proposers: CreateProposerDto[]): Promise<any> {
    return proposers.forEach(async (proposer) => {
      await this.model.findOneAndUpdate({ email: proposer.email }, proposer, {
        new: true,
        upsert: true,
      });
    });
  }

  async update(
    id: string,
    updateProposerDto: UpdateProposerDto,
  ): Promise<Proposer> {
    return await this.model.findByIdAndUpdate(id, updateProposerDto).exec();
  }

  async delete(id: string): Promise<Proposer> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
