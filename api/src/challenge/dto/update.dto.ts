// todo/dto/update-todo.dto.ts
import { BaseChallengeDto } from './base.dto';

export class UpdateChallengeDto extends BaseChallengeDto {
  completedAt: Date;
}
