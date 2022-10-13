import { CreateReviewDto } from './dto/create.dto';
import { UpdateReviewDto } from './dto/update.dto';
import { ReviewService } from './service';
export declare class ReviewController {
    private readonly service;
    constructor(service: ReviewService);
    index(res: any, query: any): Promise<any>;
    find(id: string): Promise<import("./schemas/schema").Review>;
    create(createReviewDto: CreateReviewDto): Promise<import("./schemas/schema").Review>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<import("./schemas/schema").Review>;
    delete(id: string): Promise<import("./schemas/schema").Review>;
}
