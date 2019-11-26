import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql'
import { AppRolePermissions, getAppRolePermissions } from 'saas-common/dist/app.roles'

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor (
    private readonly permissionRole: AppRolePermissions
  ) {}

  validate (req): boolean {
    return !!(getAppRolePermissions(req.user.role) & this.permissionRole) ||
      !!(getAppRolePermissions(req.user.mimicRole) & this.permissionRole)
  }

  canActivate (context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    return this.validate(req)
  }
}
