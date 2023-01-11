import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGitCommitDto } from './dto/create.dto';
import { UpdateGitCommitDto } from './dto/update.dto';
import { GitCommit, GitCommitDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { InjectQueue } from '@nestjs/bull';
import { gitCommitJobName, gitCommitQueueName } from '../types';
import { Queue } from 'bull';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class GitCommitService {
  constructor(
    @InjectModel(GitCommit.name)
    private readonly model: Model<GitCommitDocument>,
    @InjectQueue(gitCommitQueueName) private readonly queue: Queue,
  ) {}

  // Test run every 1 minute: */1 * * * *
  // Run at 12:00 every day: 00 12 * * *
  @Cron('*/1 * * * *')
  async autoQueryGitCommit() {
    const data = [
      {
        _id: 'proposalId1',
        gitLinks: [
          'https://github.com/saigonbitmaster/bWorksPublic',
          'https://github.com/saigonbitmaster/creport_2.0',
        ],
      },
      {
        _id: 'proposalId2',
        gitLinks: ['https://github.com/saigonbitmaster/creport_2.0'],
      },
    ];
    for (const repo of data) {
      await this.queue.add(gitCommitJobName, repo);
    }
  }

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
