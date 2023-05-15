import { SetMetadata } from '@nestjs/common';
import { Role } from '../types/types';

export const ROLES_KEY = 'roles';
// To simple set 1 user have only 1 role
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
