import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BookService } from './book.service'
import { Book } from './model/book'
import { BookArgs } from './dto/book.args'
import BookCrudDto from './dto/book.crud.dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.authGuard'
import { CurrentUser } from '../auth/gql.currentUser'
import { User } from '../user/model/user'
import { RoleAuthGuard } from '../auth/role.authGuard'
import { AppRolePermissions } from 'saas-common/dist/app.roles'

@Resolver(of => Book)
@UseGuards(GqlAuthGuard)
export class BookResolver {
  constructor (
    private readonly bookService: BookService
  ) {}

  @Query(returns => [Book])
  @UseGuards(new RoleAuthGuard(AppRolePermissions.ReadBooks))
  books (
    @CurrentUser() user: User,
    @Args() args: BookArgs
  ): Promise<Book[]> {
    return this.bookService.findAll(args)
  }

  @Mutation(returns => Book)
  @UseGuards(new RoleAuthGuard(AppRolePermissions.CreateBooks))
  create (@Args() newBookData: BookCrudDto): Promise<Book> {
    return this.bookService.create(newBookData)
  }

  @Mutation(returns => Book)
  @UseGuards(new RoleAuthGuard(AppRolePermissions.DeleteBooks))
  delete (@Args('id') id: string): Promise<any> {
    return this.bookService.delete(id)
  }
}
