import 'reflect-metadata'
import { container, cid } from 'inversify-props'

import AxiosService from './_base/axios/axios.service'
import IAxiosService from './_base/axios/axios.service.interface'

import IUserService from './_base/user/user.service.interface'
import UserService from './_base/user/user.service'
import UserCrudDto from './_base/user/dto/userCrud.dto'
import User from './_base/user/user.model'
import AuthService from './_base/auth/auth.service'
// import IAuthService from './_base/auth/auth.service.interface'

import IApolloClientService from '../modules/_base/apollo/apolloClient.service.interface'
import ApolloClientService from '../modules/_base/apollo/apolloClient.service'

import IBookService from '../modules/book/book.service.interface'
import Book from '../modules/book/book.model'
import BookService from '../modules/book/book.service'
import BookCrudDto from '../modules/book/dto/bookCrud.dto'
import IAuthService from './_base/auth/auth.service.interface'

export const buildDependencyContainer = () => {
  container.unbindAll()

  // Singletons
  container.addSingleton<IApolloClientService>(ApolloClientService)
  container.addSingleton<IAxiosService>(AxiosService)
  container.bind<AuthService>(AuthService).toSelf().inSingletonScope()
  // container.addSingleton<IAuthService>(AuthService)

  // Transient (instance per)
  container.addTransient<IBookService<BookCrudDto, Book>>(BookService)
  container.addTransient<IUserService<UserCrudDto, User>>(UserService)
  return container
}

export { container }

export function injectSingleton (type: any): any {
  return function (target: any, targetKey: string, index?: number): any {
    Reflect.deleteProperty(target, targetKey)
    Reflect.defineProperty(target, targetKey, {
      get () {
        return container.get(type)
      },
      set (value) {
        return value
      }
    })
  }
}
