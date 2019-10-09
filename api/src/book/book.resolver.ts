import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { BookService } from './book.service'
import { Book } from './model/book'
import { BookArgs } from './dto/book.args'
import BookCrudDto from './dto/book.crud.dto'
import { Int } from 'type-graphql'

@Resolver(of => Book)
export class BookResolver {
  constructor (private readonly bookService: BookService) {}

  @Query(returns => [Book])
  books (@Args() args: BookArgs): Promise<Book[]> {
    return this.bookService.findAll(args)
  }

  @Mutation(returns => Book)
  create (@Args() newBookData: BookCrudDto): Promise<Book> {
    return this.bookService.create(newBookData)
  }

  @Mutation(returns => Book)
  delete (@Args({ name: 'id', type: () => Int }) id: number): Promise<any> {
    return this.bookService.delete(id)
  }
}
