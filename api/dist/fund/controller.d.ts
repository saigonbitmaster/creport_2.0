import { CreateFundDto } from './dto/create.dto';
import { UpdateFundDto } from './dto/update.dto';
import { FundService } from './service';
export declare class FundController {
    private readonly service;
    constructor(service: FundService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").Fund>;
    create(createFundDto: CreateFundDto): Promise<import("./schemas/schema").Fund>;
    update(id: string, updateFundDto: UpdateFundDto): Promise<import("./schemas/schema").Fund>;
    delete(id: string): Promise<import("./schemas/schema").Fund>;
}
