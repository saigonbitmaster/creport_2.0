// todo/dto/update-todo.dto.ts
import { BaseUserDto } from './base-user.dto';
import { PartialType } from '@nestjs/mapped-types';

//allow partial update
export class UpdateUserDto extends PartialType(BaseUserDto) {}
