import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create.dto';
import { UpdateReviewDto } from './dto/update.dto';
import { Review, ReviewDocument } from './schemas/schema';
export declare class ReviewService {
    private readonly model;
    constructor(model: Model<ReviewDocument>);
    findAll(filter: any, sort: any, skip: any, limit: any): Promise<any>;
    customMethod(title: string, description: string): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    create(createReviewDto: CreateReviewDto): Promise<Review>;
    update(id: string, updateReviewDto: UpdateReviewDto): Promise<Review>;
    delete(id: string): Promise<Review>;
}
