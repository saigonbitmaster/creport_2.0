// todo/dto/update-todo.dto.ts
import { BaseSettingDto } from './base.dto';

export class UpdateSettingDto extends BaseSettingDto {
  completedAt: Date;
}
