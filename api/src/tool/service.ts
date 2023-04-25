import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AddressUtxoType } from '../flatworks/types/types';
import { RepoCodeScan, RepoCommits } from '../flatworks/utils/github';
import { AddressUtxo, TxsUtxo } from '../flatworks/utils/cardano';

@Injectable()
export class ToolService {
  constructor(private readonly httpService: HttpService) {}
  getAddressUtxo(address: string): Promise<AddressUtxoType[]> {
    return AddressUtxo(address, this.httpService);
  }

  getTxsUtxo(tx_hash: string): Promise<any[]> {
    return TxsUtxo(tx_hash, this.httpService);
  }

  async getRepoCommits(gitLink: string): Promise<any> {
    return RepoCommits(gitLink);
  }

  async repoCodeScan(gitLink: string): Promise<any> {
    return RepoCodeScan(gitLink);
  }
}
