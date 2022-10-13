export interface detail {
    quizId: string;
    amount: number;
}
export declare class BasePayoutDto {
    transactionHash: string;
    amount: number;
    date: Date;
    detail: detail[];
    description?: string;
}
