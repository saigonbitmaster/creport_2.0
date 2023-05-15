import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProposalDto } from './dto/create.dto';
import { UpdateProposalDto } from './dto/update.dto';
import { Proposal, ProposalDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { kpiQuery, kpiQueryCount } from '../flatworks/scripts/kpi';
import { fullTextSearchTransform } from '../flatworks/utils/getlist';
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

    const isPagination = query.limit > 0;
    const count = await this.model.find(query.filter).count().exec();
    const data = isPagination
      ? await this.model
          .find(query.filter)
          .sort(query.sort)
          .skip(query.skip)
          .limit(query.limit)
          .exec()
      : await this.model.find(query.filter).sort(query.sort).exec();
    return { count: count, data: data };
  }

  //global fulltext search
  async findAllSearch(query: MongooseQuery): Promise<RaList> {
    const count = await this.model.find(query.filter).count().exec();

    //fix return all when limit = 0 for global search
    if (query.limit <= 0) {
      return {
        data: [],
        count: count,
      };
    }
    const data = await this.model
      .find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .exec();

    const result = { count: count, data: data };
    return result;
  }

  async findAllKpi(query: MongooseQuery): Promise<RaList> {
    const { keyword } = query.filter;
    if (keyword) {
      query = await this._pageFullTextSearchTransform(query);
    }
    const aggregateQuery = kpiQuery(query);
    const aggregateQueryCount = kpiQueryCount(query);
    const count = await this.model.aggregate(aggregateQueryCount).exec();

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

    return { count: count[0]?.count, data: data };
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

  async getAllGithubRepos() {
    return await this.model.find(
      { gitLinks: { $exists: true, $ne: [] } },
      { gitLinks: 1 },
    );
  }

  async _pageFullTextSearchTransform(
    query: MongooseQuery,
  ): Promise<MongooseQuery> {
    const { keyword } = query.filter;
    if (keyword) {
      const [proposalIds, fundIds, challengeIds, proposerIds] =
        await Promise.all([
          this.pageFullTextSearchGetIdsOnly(keyword, false),
          this.fundService.pageFullTextSearchGetIdsOnly(keyword),
          this.challengeService.pageFullTextSearchGetIdsOnly(keyword),
          this.proposerService.pageFullTextSearchGetIdsOnly(keyword),
        ]);

      const conditionOr: any[] = [];
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
      if (conditionOr.length === 0) {
        query.filter = fullTextSearchTransform(query.filter, keyword);
        return query;
      }

      if (proposalIds && proposalIds.length > 0) {
        conditionOr.push({
          _id: {
            $in: proposalIds,
          },
        });
      }
      query.filter = {
        $or: conditionOr,
      };
    }
    return query;
  }

  /**
   * Search on page
   * @param keyword search keyword
   */
  async pageFullTextSearch(keyword: string): Promise<any[]> {
    let filters = {};
    filters = fullTextSearchTransform(filters, keyword);
    return await this.model.find(filters);
  }

  /**
   * Search on page and get ids only
   * @param keyword search keyword
   */
  async pageFullTextSearchGetIdsOnly(
    keyword: string,
    convertIdToString = true,
  ): Promise<string[]> {
    const challenges = await this.pageFullTextSearch(keyword);
    if (!challenges || challenges.length === 0) return [];
    return challenges.map((fund) =>
      convertIdToString ? fund._id.toString() : fund._id,
    );
  }
}
