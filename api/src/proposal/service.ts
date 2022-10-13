import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProposalDto } from './dto/create.dto';
import { UpdateProposalDto } from './dto/update.dto';
import { Proposal, ProposalDocument } from './schemas/schema';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name) private readonly model: Model<ProposalDocument>,
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

  async customMethod(title: string, description: string): Promise<Proposal[]> {
    return await this.model
      .aggregate([{ $match: { title: title, description: description } }])
      .exec();
  }
  async findOne(id: string): Promise<Proposal> {
    return await this.model.findById(id).exec();
  }

  async create(createProposalDto: CreateProposalDto): Promise<Proposal> {
    return await new this.model({
      ...createProposalDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateProposalDto: UpdateProposalDto,
  ): Promise<Proposal> {
    return await this.model.findByIdAndUpdate(id, updateProposalDto).exec();
  }

  async delete(id: string): Promise<Proposal> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
