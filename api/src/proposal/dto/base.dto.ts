import {
  GitCommit,
  FundTransaction,
  ProjectStatus,
} from '../../flatworks/types/types';

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
  projectStatus: ProjectStatus;
  startDate: Date;
  completeDate: Date;
  gitCommits: GitCommit[];
  fundTransactions: FundTransaction[];
  fundId: string;
  challengeId: string;
  proposerId: string;
  description: string;
}
