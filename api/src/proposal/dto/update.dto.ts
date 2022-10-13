// todo/dto/update-todo.dto.ts
import { BaseProposalDto } from './base.dto';

export class UpdateProposalDto extends BaseProposalDto {
  completedAt: Date;
}
