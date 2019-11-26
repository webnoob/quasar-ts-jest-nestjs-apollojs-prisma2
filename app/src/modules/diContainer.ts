import 'reflect-metadata'
import { container } from 'inversify-props'
import { Cookies, QSsrContext } from 'quasar'
import { Store } from 'vuex'

import AxiosService from './_base/axios/axios.service'
import IUserService from './_base/user/user.service.interface'
import UserService from './_base/user/user.service'
import UserCrudDto from './_base/user/dto/userCrud.dto'
import User from './_base/user/user.model'
import AuthService from './_base/auth/auth.service'
import ApolloClientService from '../modules/_base/apollo/apolloClient.service'
import BookServiceInterface from '../modules/book/book.service.interface'
import Book from '../modules/book/book.model'
import BookService from '../modules/book/book.service'
import BookCrudDto from '../modules/book/dto/bookCrud.dto'
import StoreService from './_base/store.service'
import { RootState } from '../store/types'

export const buildDependencyContainer = (ssrContext: QSsrContext, store: Store<RootState>) => {
  // console.log('Binding dependencies: ', ssrContext, store)
  container.unbindAll()

  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  // Singletons
  container.bind<AxiosService>(AxiosService).toSelf().inSingletonScope()
  container.bind<ApolloClientService>(ApolloClientService).toSelf().inSingletonScope()
  container.bind<AuthService>(AuthService).toSelf().inSingletonScope()

  container.bind<StoreService>(StoreService).toSelf().inSingletonScope()
  const storeService = container.get(StoreService)
  storeService.configure(store)
  store.$cookies = cookies

  // Transient (instance per)
  container.addTransient<BookServiceInterface<BookCrudDto, Book>>(BookService)
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
