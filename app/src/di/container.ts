import { container } from 'inversify-props'
import { IBookService } from '../modules/book/book.service.interface'
import Book from '../modules/book/book.model'
import BookService from '../modules/book/book.service'
import { IApolloClientService } from '../modules/_common/apolloClient.service.interface'
import ApolloClientService from '../modules/_common/apolloClient.service'
import BookCrudDto from '../modules/book/dto/bookCrud.dto'

export const buildDependencyContainer = () => {
  container.unbindAll()

  // Singletons
  container.addSingleton<IApolloClientService>(ApolloClientService)

  // Transient (instance per)
  container.addTransient<IBookService<BookCrudDto, Book>>(BookService)
}
