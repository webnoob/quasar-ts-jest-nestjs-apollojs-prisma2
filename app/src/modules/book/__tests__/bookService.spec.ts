/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import 'reflect-metadata'
import { container } from 'inversify-props'
container.unbindAll()

import { IBookService } from '../book.service.interface'
import BookCrudDto from '../dto/bookCrud.dto'
import Book from '../book.model'
import BookService from '../book.service'
import BaseCrudService from '../../_base/baseCrud.service'
import { IApolloClientService } from '../../_common/apolloClient.service.interface'
import ApolloClientService from '../../_common/__tests__/fakes/apolloClient.service.mock'

describe('Test Book Service', () => {
  container.addSingleton<IApolloClientService>(ApolloClientService)
  container.addTransient<IBookService<BookCrudDto, Book>>(BookService)
  const bookService = container.resolve(BookService)

  it('is instance of BaseCrudService', () => {
    expect(bookService).toBeInstanceOf(BaseCrudService)
  })
})
