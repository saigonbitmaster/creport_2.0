import { HttpService } from '@nestjs/axios';
import { addressUtxo } from '../types';
export declare class ToolService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getAddressUtxo(address: string): Promise<addressUtxo[]>;
    getTxsUtxo(tx_hash: string): Promise<any[]>;
    getRepoCommits(gitLink: string): Promise<any>;
    repoCodeScan(gitLink: string): Promise<any>;
}
