import { Args, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.authGuard'
import { CurrentUser } from '../auth/gql.currentUser'
import { User } from '../user/model/user'
import { RoleAuthGuard } from '../auth/role.authGuard'
import { AppRolePermissions } from 'saas-common/dist/app.roles'
import { UserService } from './user.service'

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor (
    private readonly userService: UserService
  ) {}

  @Query(returns => [User])
  @UseGuards(new RoleAuthGuard(AppRolePermissions.CanMimicUsers))
  getUsersToMimic (@CurrentUser() user: User, @Args('needle') needle: string): Promise<User[]> {
    return this.userService.getUsersToMimic(user, needle)
  }
}
