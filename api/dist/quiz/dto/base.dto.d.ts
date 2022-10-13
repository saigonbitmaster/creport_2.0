interface choice {
    name: string;
    value: boolean;
    label: string;
    id: string;
    isRight: boolean;
}
export declare class BaseQuizDto {
    singleChoice: boolean;
    quizSetId: string;
    title: string;
    choices: choice[];
    description?: string;
}
export {};
