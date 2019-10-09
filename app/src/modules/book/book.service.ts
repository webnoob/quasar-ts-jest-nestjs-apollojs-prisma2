import Book from './book.model'
import BaseCrudService from '../base/base.crud.service'
import ICrudService from '../base/ICrudService'
import BookCrudDto from './dto/book.crud.dto'

const bookService = class BookService extends BaseCrudService<Book> implements ICrudService<BookCrudDto, Book> {
  public constructor () {
    super()
  }

  public get (): Promise<Book[]> {
    return Promise.resolve([new Book(), new Book()])
  }

  public getById (id: number): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public create (dto: BookCrudDto): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public update (dto: BookCrudDto): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public delete (id: number): Promise<any> {
    return Promise.resolve()
  }
}

export default new bookService
