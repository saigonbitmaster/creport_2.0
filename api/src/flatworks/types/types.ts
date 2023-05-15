export interface GitCommit {
  sha: string;
  message: string;
  url: string;
  date: Date;
}

export interface FundTransaction {
  hash: string;
  amount: number;
  date: Date;
}

export interface RaList {
  count: number;
  data: any[];
}

export interface AddressUtxoType {
  tx_hash: string;
  block: string;
  amount: { unit: string; quantity: number }[];
}

export type ProjectStatus = 'pending' | 'complete' | 'stopped';
export interface userJwtPayload {
  userId: string;
  username: string;
}

export interface MongooseQuery {
  filter: { [key: string]: any };
  sort: { [key: string]: any };
  skip: number;
  limit: number;
}

export interface CheckWalletType {
  amount: number;
  enough: boolean;
}
export interface GitLink {
  gitUrl: string;
}

export interface ImportBody {
  sheet: string;
  id: string;
  forceReplace: boolean;
}

export enum Role {
  Admin = 'Admin',
  User = 'User',
}
