export interface gitCommit {
  id: string;
  message: string;
  url: string;
  date: Date;
}

export interface fundTransaction {
  hash: string;
  amount: number;
  date: Date;
}

export interface raList {
  count: number;
  data: any[];
}

export interface addressUtxo {
  tx_hash: string;
  block: string;
  amount: { unit: string; quantity: number }[];
}

export type projectStatus = 'pending' | 'complete' | 'stopped';

export const gitCommitQueueName = 'git_commit_queue_name';
export const gitCommitJobName = 'git_commit_job_name';
