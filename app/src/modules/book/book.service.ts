import Book from './book.model'
import BaseCrudService from '../base/base.crud.service'
import ICrudService from '../base/ICrudService'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-client'
import IBookCrudDto from './dto/IBookCrudDto'

class BookService extends BaseCrudService<Book> implements ICrudService<IBookCrudDto, Book> {
  public constructor (private readonly apolloClientService: ApolloClient<any>) {
    super()
  }

  public get (): Promise<Book[]> {
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

  public create (dto: IBookCrudDto): Promise<Book> {
    return this.apolloClientService.mutate({
      variables: {
        title: dto.title
      },
      mutation: gql`
        mutation CreateBook ($title: String) {
          create (title: $title) {
            id,
            title,
            description
          }
        }
      `
    }).then(r => {
      return r.data.create
    })
  }

  public update (dto: IBookCrudDto): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public delete (id: number): Promise<any> {
    return Promise.resolve()
  }
}

export default BookService
