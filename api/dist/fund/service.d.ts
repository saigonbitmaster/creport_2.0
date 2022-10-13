import { Model } from 'mongoose';
import { CreateFundDto } from './dto/create.dto';
import { UpdateFundDto } from './dto/update.dto';
import { Fund, FundDocument } from './schemas/schema';
import { raList } from '../types';
export declare class FundService {
    private readonly model;
    constructor(model: Model<FundDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<raList>;
    findOne(id: string): Promise<Fund>;
    create(createFundDto: CreateFundDto): Promise<Fund>;
    update(id: string, updateFundDto: UpdateFundDto): Promise<Fund>;
    delete(id: string): Promise<Fund>;
}
