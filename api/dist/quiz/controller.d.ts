import { CreateQuizDto } from './dto/create.dto';
import { UpdateQuizDto } from './dto/update.dto';
import { QuizService } from './service';
export declare class QuizController {
    private readonly service;
    constructor(service: QuizService);
    index(res: any, query: any): Promise<any>;
    aggregate(title: string, description: string): Promise<import("./schemas/schema").Quiz[]>;
    find(id: string): Promise<import("./schemas/schema").Quiz>;
    create(createQuizDto: CreateQuizDto): Promise<import("./schemas/schema").Quiz>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<import("./schemas/schema").Quiz>;
    delete(id: string): Promise<import("./schemas/schema").Quiz>;
}
