
// todo/dto/update-todo.dto.ts
import { BaseUserDto } from './base-user.dto';

export class UpdateUserDto extends BaseUserDto {
  completedAt: Date;
}