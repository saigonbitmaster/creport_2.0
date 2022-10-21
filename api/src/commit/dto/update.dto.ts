// todo/dto/update-todo.dto.ts
import { BaseGitCommitDto } from './base.dto';

export class UpdateGitCommitDto extends BaseGitCommitDto {
  completedAt: Date;
}
