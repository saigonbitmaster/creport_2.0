// todo/dto/update-todo.dto.ts
import { BaseProposerDto } from './base.dto';

export class UpdateProposerDto extends BaseProposerDto {
  completedAt: Date;
}
