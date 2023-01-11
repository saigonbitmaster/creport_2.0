import { Processor, Process } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { RepoCommits } from '../flatworks/utils/github';
import { gitCommitQueueName, gitCommitJobName } from '../types';
import { GitCommit, GitCommitDocument } from './schemas/schema';

@Processor(gitCommitQueueName)
@Injectable()
export class GitCommitProcessor {
  constructor(
    @InjectModel(GitCommit.name)
    private readonly model: Model<GitCommitDocument>,
  ) {}

  @Process(gitCommitJobName)
  async handleGitCommitJob(job: Job<unknown>) {
    const proposalRepos = job.data;
    const proposalId = proposalRepos['_id'];
    const gitLinks = proposalRepos['gitLinks'];
    if (!gitLinks || gitLinks.length === 0) return;
    // Get cpmmit data
    const promises = [];
    for (const gitLink of gitLinks) {
      promises.push(RepoCommits(gitLink));
    }
    let gitCommits = await Promise.all(promises);
    if (!gitCommits || gitCommits.length === 0) return;
    gitCommits = gitCommits.flat(1);

    // Insert if doesn't exist proposalId
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const checkProposalExists = await this.model.findOne({ proposalId });
    if (!checkProposalExists) {
      await new this.model({
        proposalId,
        commits: gitCommits,
        createdDate: new Date(),
      }).save();
    } else {
      // Update git commits
    }
  }
}
