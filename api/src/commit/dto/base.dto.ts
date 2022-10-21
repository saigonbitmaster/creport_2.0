import { GitCommit } from '../../flatworks/types/types';
export class BaseGitCommitDto {
  proposalId: string;
  commits: GitCommit[];
}
