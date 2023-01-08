import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProposalDto } from './dto/create.dto';
import { UpdateProposalDto } from './dto/update.dto';
import { Proposal, ProposalDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { kpiQuery } from '../flatworks/scripts/kpi';
import { FundService } from '../fund/service';
import { ChallengeService } from '../challenge/service';
import { ProposerService } from '../proposer/service';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name) private readonly model: Model<ProposalDocument>,
    private readonly fundService: FundService,
    private readonly challengeService: ChallengeService,
    private readonly proposerService: ProposerService,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const { keyword } = query.filter;
    if (keyword) {
      query = await this._pageFullTextSearchTransform(query);
    }

    const count = await this.model.find(query.filter).count().exec();
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();
    return { count: count, data: data };
  }

  async findAllKpi(query: MongooseQuery): Promise<RaList> {
    const { keyword } = query.filter;
    if (keyword) {
      query = await this._pageFullTextSearchTransform(query);
    }
    const aggregateQuery = kpiQuery(query);

    const _data = await this.model.aggregate(aggregateQuery).exec();
    const data = _data.map((item) => {
      item.commits = item.commit ? item.commit.length : 0;
      item.lastMonthCommits = item.lastMonthCommit
        ? item.lastMonthCommit.length
        : 0;
      delete item.commit;
      delete item.lastMonthCommit;
      return item;
    });

    return { count: 10, data: data };
  }

  async findOne(id: string): Promise<Proposal> {
    return await this.model.findById(id).exec();
  }

  async import(proposals: CreateProposalDto[]): Promise<any> {
    return proposals.forEach(async (proposal) => {
      await this.model.findOneAndUpdate(
        { projectId: proposal.projectId },
        proposal,
        {
          new: true,
          upsert: true,
        },
      );
    });
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

  async _pageFullTextSearchTransform(
    query: MongooseQuery,
  ): Promise<MongooseQuery> {
    const { keyword } = query.filter;
    if (keyword) {
      const [fundIds, challengeIds, proposerIds] = await Promise.all([
        this.fundService.pageFullTextSearch(['name'], keyword),
        this.challengeService.pageFullTextSearch(['name'], keyword),
        this.proposerService.pageFullTextSearch(['fullName'], keyword),
      ]);
      delete query.filter.keyword;
      const searchPattern = { $regex: keyword, $options: 'i' };
      const conditionOr: any[] = [
        {
          name: searchPattern,
        },
        {
          projectId: searchPattern,
        },
        {
          projectStatus: searchPattern,
        },
        // requestedBudget is number field so need search like this
        {
          $expr: {
            $regexMatch: {
              input: { $toString: '$requestedBudget' },
              regex: new RegExp(keyword),
            },
          },
        },
      ];
      if (fundIds && fundIds.length > 0) {
        conditionOr.push({
          fundId: {
            $in: fundIds,
          },
        });
      }
      if (challengeIds && challengeIds.length > 0) {
        conditionOr.push({
          challengeId: {
            $in: challengeIds,
          },
        });
      }
      if (proposerIds && proposerIds.length > 0) {
        conditionOr.push({
          proposerId: {
            $in: proposerIds,
          },
        });
      }
      query.filter = {
        ...query.filter,
        $or: conditionOr,
      };
    }
    return query;
  }
}
