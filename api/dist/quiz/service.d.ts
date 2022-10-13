import { Model } from 'mongoose';
import { CreateQuizDto } from './dto/create.dto';
import { UpdateQuizDto } from './dto/update.dto';
import { Quiz, QuizDocument } from './schemas/schema';
export declare class QuizService {
    private readonly model;
    constructor(model: Model<QuizDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<any>;
    customMethod(title: string, description: string): Promise<Quiz[]>;
    findOne(id: string): Promise<Quiz>;
    create(createQuizDto: CreateQuizDto): Promise<Quiz>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<Quiz>;
    delete(id: string): Promise<Quiz>;
}
