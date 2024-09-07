import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '../types/types';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //get required roles from controller decorator
    const requiredRole = this.reflector.getAllAndOverride<Role>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Api no need role, canActive = true
    if (!requiredRole) return true;
    const { user } = context.switchToHttp().getRequest();
    console.log(user, requiredRole);
    // User don't have role, canActive = false
    if (!user || !user.roles) return false;
    // Check api role required with user role
    return user.roles.includes(requiredRole);
  }
}
