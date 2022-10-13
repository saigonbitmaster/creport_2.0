import { CreatePayoutDto } from './dto/create.dto';
import { UpdatePayoutDto } from './dto/update.dto';
import { PayoutService } from './service';
export declare class PayoutController {
    private readonly service;
    constructor(service: PayoutService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").Payout>;
    create(createPayoutDto: CreatePayoutDto): Promise<import("./schemas/schema").Payout>;
    update(id: string, updatePayoutDto: UpdatePayoutDto): Promise<import("./schemas/schema").Payout>;
    delete(id: string): Promise<import("./schemas/schema").Payout>;
}
