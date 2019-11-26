import { injectable } from 'inversify-props'

import BaseCrudService from '../../../_base/baseCrud.service'
import Book from '../../book.model'
import BookServiceInterface from '../../book.service.interface'
import BookCrudDto from '../../dto/bookCrud.dto'

@injectable()
class BookService extends BaseCrudService<BookCrudDto, Book> implements BookServiceInterface<BookCrudDto, Book> {
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

  public getById (id: string): Promise<Book> {
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

  public delete (id: string): Promise<any> {
    return Promise.resolve()
  }
}

export default BookService
