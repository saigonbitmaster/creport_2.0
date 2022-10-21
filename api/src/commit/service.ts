import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGitCommitDto } from './dto/create.dto';
import { UpdateGitCommitDto } from './dto/update.dto';
import { GitCommit, GitCommitDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';

@Injectable()
export class GitCommitService {
  constructor(
    @InjectModel(GitCommit.name)
    private readonly model: Model<GitCommitDocument>,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const commit = await this.model
      .findOne({ proposalId: query.filter.proposalId })
      .exec();

    if (!commit) {
      return { count: 1, data: [] };
    }

    const data = commit.commits.slice(query.skip, query.limit + query.skip);
    return { count: commit.commits.length, data: data };
  }

  async create(createGitCommitDto: CreateGitCommitDto): Promise<GitCommit> {
    return await new this.model({
      ...createGitCommitDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateGitCommitDto: UpdateGitCommitDto,
  ): Promise<GitCommit> {
    return await this.model.findByIdAndUpdate(id, updateGitCommitDto).exec();
  }

  async delete(id: string): Promise<GitCommit> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
