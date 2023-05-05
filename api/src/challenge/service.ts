import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengeDto } from './dto/create.dto';
import { UpdateChallengeDto } from './dto/update.dto';
import { Challenge, ChallengeDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { FundService } from '../fund/service';
import { fullTextSearchTransform } from '../flatworks/utils/getlist';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectModel(Challenge.name)
    private readonly model: Model<ChallengeDocument>,
    private readonly fundService: FundService,
  ) {}

  async findAll(query: MongooseQuery): Promise<RaList> {
    const { keyword } = query.filter;
    if (keyword) {
      query.filter = fullTextSearchTransform(query.filter, keyword);
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
    const result = { count: count, data: data };
    return result;
  }

  async findMany(ids: string[]): Promise<any> {
    return await this.model.find({ _id: { $in: ids } });
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

  async findOne(id: string): Promise<Challenge> {
    return await this.model.findById(id).exec();
  }

  async findByName(fundId: string, name: string): Promise<Challenge> {
    return await this.model.findOne({ fundId: fundId, name: name }).exec();
  }

  async import(challenges: CreateChallengeDto[]): Promise<any> {
    return challenges.forEach(async (challenge) => {
      await this.model.findOneAndUpdate({ name: challenge.name }, challenge, {
        new: true,
        upsert: true,
      });
    });
  }

  async create(createChallengeDto: CreateChallengeDto): Promise<Challenge> {
    return await new this.model({
      ...createChallengeDto,
      createdAt: new Date(),
    }).save();
  }

  async update(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<Challenge> {
    return await this.model.findByIdAndUpdate(id, updateChallengeDto).exec();
  }

  async delete(id: string): Promise<Challenge> {
    return await this.model.findByIdAndDelete(id).exec();
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
