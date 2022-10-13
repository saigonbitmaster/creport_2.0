// todo/dto/update-todo.dto.ts
import { BaseFundDto } from './base.dto';

export class UpdateFundDto extends BaseFundDto {
  completedAt: Date;
}
