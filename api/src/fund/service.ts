import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFundDto } from './dto/create.dto';
import { UpdateFundDto } from './dto/update.dto';
import { Fund, FundDocument } from './schemas/schema';
import { RaList, MongooseQuery } from '../flatworks/types/types';
import { fullTextSearchTransform } from '../flatworks/utils/getlist';

@Injectable()
export class FundService {
  constructor(
    @InjectModel(Fund.name) private readonly model: Model<FundDocument>,
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

  async findById(id: string): Promise<Fund> {
    return await this.model.findById(id).exec();
  }

  async findMany(ids: string[]): Promise<any> {
    return await this.model.find({ _id: { $in: ids } });
  }

  async findByName(name: string): Promise<Fund> {
    return await this.model.findOne({ name: name }).exec();
  }

  async create(createFundDto: CreateFundDto): Promise<Fund> {
    return await new this.model({
      ...createFundDto,
      createdAt: new Date(),
    }).save();
  }

  async import(funds: CreateFundDto[]): Promise<any> {
    return funds.forEach(async (fund) => {
      await this.model.findOneAndUpdate({ name: fund.name }, fund, {
        new: true,
        upsert: true,
      });
    });
  }

  async update(id: string, updateFundDto: UpdateFundDto): Promise<Fund> {
    return await this.model.findByIdAndUpdate(id, updateFundDto).exec();
  }

  async delete(id: string): Promise<Fund> {
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
