import gql from 'graphql-tag'
import { inject, injectable } from 'inversify-props'

import BaseCrudService from '../_base/baseCrud.service'

import Book from './book.model'
import IBookService from './book.service.interface'
import BookCrudDto from './dto/bookCrud.dto'

@injectable()
class BookService extends BaseCrudService<BookCrudDto, Book> implements IBookService<BookCrudDto, Book> {
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
      return r.data
    })
  }

  public getById (id: number): Promise<Book> {
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
      return r.data.create
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
