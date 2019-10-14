import Book from './book.model'
import BaseCrudService from '../base/base.crud.service'
import ICrudService from '../base/ICrudService'
import BookCrudDto from './dto/book.crud.dto'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'

class BookService extends BaseCrudService<Book> implements ICrudService<BookCrudDto, Book> {
  public constructor (private readonly apolloClientService: ApolloClient<any>) {
    super()
  }

  public get (): Promise<Book[]> {
    console.log(this.apolloClientService)
    return this.apolloClientService.query({
      query: gql`
        query GetBooks {
          books {
            id,
            title,
            description
          }
        }
      `
    }).then(r => {
      return r.data
    })
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

export default BookService
