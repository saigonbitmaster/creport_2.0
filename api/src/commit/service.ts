import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGitCommitDto } from './dto/create.dto';
import { UpdateGitCommitDto } from './dto/update.dto';
import { GitCommit, GitCommitDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { Cron } from '@nestjs/schedule';
import { ProposalService } from '../proposal/service';
import { RepoCommits } from '../flatworks/utils/github';

@Injectable()
export class GitCommitService {
  constructor(
    @InjectModel(GitCommit.name)
    private readonly model: Model<GitCommitDocument>,
    private readonly proposalService: ProposalService,
  ) {}

  // Test run every 1 minute: */1 * * * *
  // Run at 12:00 every day: 00 12 * * *
  //0 10 * * * *	every hour, at the start of the 10th minute
  @Cron('*/10 * * * *')
  async autoQueryGitCommit() {
    try {
      const allGithubRepos = await this.proposalService.getAllGithubRepos();
      if (!allGithubRepos || allGithubRepos.length === 0) return;
      // Loop all proposal
      for (const githubRepo of allGithubRepos) {
        const gitLinks = githubRepo.gitLinks;
        const proposalId = githubRepo._id;
        console.log('githubRepo:::', githubRepo.gitLinks);
        if (!gitLinks || gitLinks.length === 0) break;

        // Loop all git repo of 1 proposal
        const promises = [];
        for (const gitLinkItem of gitLinks) {
          promises.push(RepoCommits(gitLinkItem['gitLink']));
        }
        // Get all git commit and flat map array data
        let gitCommits = await Promise.all(promises);
        if (!gitCommits || gitCommits.length === 0) break;
        gitCommits = gitCommits.flat(1);

        // Insert if doesn't exist proposalId
        const checkProposalExists = await this.model.findOne({ proposalId });
        if (!checkProposalExists) {
          await new this.model({
            proposalId,
            commits: gitCommits,
            createdDate: new Date(),
          }).save();
          console.log('====finish insert====');
        } else {
          // Append new git commits to existing commits array
          const allShaFromGithub = gitCommits.map((gitCommit) => gitCommit.sha);
          const allShaInsideDb = checkProposalExists.commits.map(
            (gitCommit) => gitCommit.sha,
          );
          const newShaNeedAppend = allShaFromGithub.filter(
            (sha) => !allShaInsideDb.includes(sha),
          );

          if (newShaNeedAppend.length > 0) {
            const newGitCommitNeedAppend = allShaFromGithub.filter((sha) =>
              newShaNeedAppend.includes(sha),
            );

            if (newGitCommitNeedAppend.length > 0) {
              const promises = [];
              for (const gitCommit of newGitCommitNeedAppend) {
                promises.push(
                  this.model.updateOne(
                    {
                      proposalId,
                    },
                    {
                      $push: { commits: gitCommit },
                    },
                  ),
                );
              }
              await Promise.all(promises);
            }
          }

          console.log('====finish update====');
        }
      }
    } catch (error) {
      console.log('autoQueryGitCommitError:::', error);
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
