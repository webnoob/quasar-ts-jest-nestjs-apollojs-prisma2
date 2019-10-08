import Book from './book.model'
import BaseCrudService from '../base/base.crud.service'
import ICrudService from '../base/ICrudService'
import BookCrudDto from './dto/book.crud.dto'

const bookService = class BookService extends BaseCrudService<Book> implements ICrudService<BookCrudDto, Book> {
  constructor () {
    super()
  }
  
  get (): Promise<Book[]> {
    return Promise.resolve([new Book(), new Book()])
  }
  
  getById (id: number): Promise<Book> {
    return Promise.resolve(new Book())
  }
  
  create (dto: BookCrudDto): Promise<Book> {
    return Promise.resolve(new Book())
  }
  
  update (dto: BookCrudDto): Promise<Book> {
    return Promise.resolve(new Book())
  }
  
  delete (id: number): Promise<any> {
    return Promise.resolve()
  }  
}

export default new bookService