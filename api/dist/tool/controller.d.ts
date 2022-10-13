import { ToolService } from './service';
export declare class ToolController {
    private readonly service;
    constructor(service: ToolService);
    getUtxos(res: any, query: any): Promise<any>;
    getCommits(res: any, query: any): Promise<any>;
}
