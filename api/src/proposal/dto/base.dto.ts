import { gitCommit, fundTransaction, projectStatus } from '../../types';

export class BaseProposalDto {
  name: string;
  projectId: string;
  proposalUrl: string;
  requestedBudget: number;
  previousProposals: string[];
  walletAddress: string;
  // gitLink: string;
  gitLinks: string;
  smartContract: string;
  projectStatus: projectStatus;
  startDate: Date;
  completeDate: Date;
  gitCommits: gitCommit[];
  fundTransactions: fundTransaction[];
  fundId: string;
  challengeId: string;
  proposerId: string;
  description: string;
}
