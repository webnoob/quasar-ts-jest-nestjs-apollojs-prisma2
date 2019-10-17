import { injectable } from 'inversify-props'

import BaseCrudService from '../../../_base/baseCrud.service'
import Book from '../../book.model'
import IBookService from '../../book.service.interface'
import BookCrudDto from '../../dto/bookCrud.dto'

@injectable()
class BookService extends BaseCrudService<BookCrudDto, Book> implements IBookService<BookCrudDto, Book> {
  public constructor () {
    super()
  }

  public get (): Promise<Book[]> {
    return Promise.resolve([{
      ...new Book(),
      id: 'bob',
      title: 'Alakazam!',
      description: 'Aladdins book!'
    }])
  }

  public getById (id: number): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public create (dto: BookCrudDto): Promise<Book> {
    return Promise.resolve({
      ...new Book(),
      ...dto
    })
  }

  public update (dto: BookCrudDto): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public delete (id: number): Promise<any> {
    return Promise.resolve()
  }
}

export default BookService
