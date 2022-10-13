import { Model } from 'mongoose';
import { CreateProposalDto } from './dto/create.dto';
import { UpdateProposalDto } from './dto/update.dto';
import { Proposal, ProposalDocument } from './schemas/schema';
export declare class ProposalService {
    private readonly model;
    constructor(model: Model<ProposalDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<any>;
    customMethod(title: string, description: string): Promise<Proposal[]>;
    findOne(id: string): Promise<Proposal>;
    create(createProposalDto: CreateProposalDto): Promise<Proposal>;
    update(id: string, updateProposalDto: UpdateProposalDto): Promise<Proposal>;
    delete(id: string): Promise<Proposal>;
}
