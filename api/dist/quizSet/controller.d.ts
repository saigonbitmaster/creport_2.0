import { CreateQuizSetDto } from './dto/create.dto';
import { UpdateQuizSetDto } from './dto/update.dto';
import { QuizSetService } from './service';
export declare class QuizSetController {
    private readonly service;
    constructor(service: QuizSetService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").QuizSet>;
    create(createQuizSetDto: CreateQuizSetDto): Promise<import("./schemas/schema").QuizSet>;
    update(id: string, updateQuizSetDto: UpdateQuizSetDto): Promise<import("./schemas/schema").QuizSet>;
    delete(id: string): Promise<import("./schemas/schema").QuizSet>;
}
