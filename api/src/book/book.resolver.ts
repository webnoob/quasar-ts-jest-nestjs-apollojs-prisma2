import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BookService } from './book.service'
import { Book } from './model/book'
import { BookArgs } from './dto/book.args'
import BookCrudDto from './dto/book.crud.dto'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from '../auth/gql.authGuard'

@Resolver(of => Book)
export class BookResolver {
  constructor (private readonly bookService: BookService) {}

  @Query(returns => [Book])
  @UseGuards(GqlAuthGuard)
  books (@Args() args: BookArgs): Promise<Book[]> {
    return this.bookService.findAll(args)
  }

  @Mutation(returns => Book)
  create (@Args() newBookData: BookCrudDto): Promise<Book> {
    return this.bookService.create(newBookData)
  }

  @Mutation(returns => Book)
  delete (@Args('id') id: string): Promise<any> {
    return this.bookService.delete(id)
  }
}
