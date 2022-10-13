import { Model } from 'mongoose';
import { CreatePayoutDto } from './dto/create.dto';
import { UpdatePayoutDto } from './dto/update.dto';
import { Payout, PayoutDocument } from './schemas/schema';
export declare class PayoutService {
    private readonly model;
    constructor(model: Model<PayoutDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<any>;
    findOne(id: string): Promise<Payout>;
    create(createPayoutDto: CreatePayoutDto): Promise<Payout>;
    update(id: string, updatePayoutDto: UpdatePayoutDto): Promise<Payout>;
    delete(id: string): Promise<Payout>;
}
