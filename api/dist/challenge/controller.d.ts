import { CreateChallengeDto } from './dto/create.dto';
import { UpdateChallengeDto } from './dto/update.dto';
import { ChallengeService } from './service';
export declare class ChallengeController {
    private readonly service;
    constructor(service: ChallengeService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").Challenge>;
    create(createChallengeDto: CreateChallengeDto): Promise<import("./schemas/schema").Challenge>;
    update(id: string, updateChallengeDto: UpdateChallengeDto): Promise<import("./schemas/schema").Challenge>;
    delete(id: string): Promise<import("./schemas/schema").Challenge>;
}
