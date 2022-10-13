import { Model } from 'mongoose';
import { CreateChallengeDto } from './dto/create.dto';
import { UpdateChallengeDto } from './dto/update.dto';
import { Challenge, ChallengeDocument } from './schemas/schema';
export declare class ChallengeService {
    private readonly model;
    constructor(model: Model<ChallengeDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<any>;
    customMethod(title: string, description: string): Promise<Challenge[]>;
    findOne(id: string): Promise<Challenge>;
    create(createChallengeDto: CreateChallengeDto): Promise<Challenge>;
    update(id: string, updateChallengeDto: UpdateChallengeDto): Promise<Challenge>;
    delete(id: string): Promise<Challenge>;
}
