import gql from 'graphql-tag'
import { injectable } from 'inversify-props'

import BaseCrudService from '../_base/baseCrud.service'
import Book from './book.model'
import BookServiceInterface from './book.service.interface'
import BookCrudDto from './dto/bookCrud.dto'

@injectable()
class BookService extends BaseCrudService<BookCrudDto, Book> implements BookServiceInterface<BookCrudDto, Book> {
  public get (): Promise<Book[]> {
    return this.apolloClientService.client.query({
      query: gql`
        query GetBooks {
          books {
            id,
            title,
            description
          }
        }
      `
    }).then((r: any) => {
      return r.data.books
    })
  }

  public getById (id: string): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public create (dto: BookCrudDto): Promise<Book> {
    return this.apolloClientService.client.mutate({
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
    }).then((r: any) => {
      return r.data ? r.data.create : null
    })
  }

  public update (dto: BookCrudDto): Promise<Book> {
    return Promise.resolve(new Book())
  }

  public delete (id: string): Promise<any> {
    return this.apolloClientService.client.mutate({
      variables: {
        id
      },
      mutation: gql`
        mutation DeleteBook ($id: String!) {
          delete (id: $id) {
            id
          }
        }
      `
    }).then((r: any) => {
      return r.data ? r.data.create : null
    })
  }
}

export default BookService
