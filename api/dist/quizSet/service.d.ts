import { Model } from 'mongoose';
import { CreateQuizSetDto } from './dto/create.dto';
import { UpdateQuizSetDto } from './dto/update.dto';
import { QuizSet, QuizSetDocument } from './schemas/schema';
export declare class QuizSetService {
    private readonly model;
    constructor(model: Model<QuizSetDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<any>;
    customMethod(title: string, description: string): Promise<QuizSet[]>;
    findOne(id: string): Promise<QuizSet>;
    create(createQuizSetDto: CreateQuizSetDto): Promise<QuizSet>;
    update(id: string, updateQuizSetDto: UpdateQuizSetDto): Promise<QuizSet>;
    delete(id: string): Promise<QuizSet>;
}
