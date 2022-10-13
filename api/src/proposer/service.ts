import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProposerDto } from './dto/create.dto';
import { UpdateProposerDto } from './dto/update.dto';
import { Proposer, ProposerDocument } from './schemas/schema';

@Injectable()
export class ProposerService {
  constructor(
    @InjectModel(Proposer.name) private readonly model: Model<ProposerDocument>,
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

  async customMethod(title: string, description: string): Promise<Proposer[]> {
    return await this.model
      .aggregate([{ $match: { title: title, description: description } }])
      .exec();
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
