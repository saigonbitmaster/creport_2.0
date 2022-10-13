import { Model } from 'mongoose';
import { CreateProposerDto } from './dto/create.dto';
import { UpdateProposerDto } from './dto/update.dto';
import { Proposer, ProposerDocument } from './schemas/schema';
export declare class ProposerService {
    private readonly model;
    constructor(model: Model<ProposerDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<any>;
    customMethod(title: string, description: string): Promise<Proposer[]>;
    findOne(id: string): Promise<Proposer>;
    create(createProposerDto: CreateProposerDto): Promise<Proposer>;
    update(id: string, updateProposerDto: UpdateProposerDto): Promise<Proposer>;
    delete(id: string): Promise<Proposer>;
}
