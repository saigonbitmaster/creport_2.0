import { CreateProposalDto } from './dto/create.dto';
import { UpdateProposalDto } from './dto/update.dto';
import { ProposalService } from './service';
export declare class ProposalController {
    private readonly service;
    constructor(service: ProposalService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").Proposal>;
    create(createProposalDto: CreateProposalDto): Promise<import("./schemas/schema").Proposal>;
    update(id: string, updateProposalDto: UpdateProposalDto): Promise<import("./schemas/schema").Proposal>;
    delete(id: string): Promise<import("./schemas/schema").Proposal>;
}
