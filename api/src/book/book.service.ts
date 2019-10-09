import { Injectable } from '@nestjs/common'
import { BookArgs } from './dto/book.args'
import { Book } from './model/book'
import BookCrudDto from './dto/book.crud.dto'

@Injectable()
export class BookService {
  findAll (args: BookArgs): Promise<Book[]> {
    return Promise.resolve([new Book()])
  }

  create (newBookData: BookCrudDto) {
    return Promise.resolve(new Book())
  }

  delete (id: number) {
    return Promise.resolve()
  }
}
