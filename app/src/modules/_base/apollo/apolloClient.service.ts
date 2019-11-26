import fetch from 'node-fetch'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { injectable } from 'inversify-props'
import { uid } from 'quasar'

import ApolloClientServiceInterface from './apolloClient.service.interface'
import { injectSingleton } from '../../diContainer'
import { AUTH_INVALID, AUTH_REQUIRED } from '../../../store/actions/auth'
import StoreService from '../store.service'
import { ERROR_GENERIC } from '../../../store/actions/error'

@injectable()
class ApolloClientService implements ApolloClientServiceInterface {
  public client: ApolloClient<any>

  public readonly uid: string = uid()

  public constructor (
    @injectSingleton(StoreService) storeService: StoreService
  ) {
    // console.log('Creating apollo client service', this.uid)

    const httpLink = createHttpLink({
      uri: 'http://localhost:3000/graphql',
      fetch: fetch as any
    })

    // If we have an authenticated user, attach the appropriate headers.
    let authLink!: ApolloLink
    if (storeService.store.getters.isAuthenticated) {
      authLink = setContext((_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${storeService.store.getters.authToken}`,
          }
        }
      })
    }

    const logoutLink = onError((error) => {
      const errorRes = error.response
      if (errorRes) {
        const errors = errorRes.errors
        if (errors && errors.length) {
          const error = errors[0]
          // @ts-ignore
          switch (error.message.statusCode) {
            case 401: storeService.store.dispatch(AUTH_REQUIRED); break
            case 403: storeService.store.dispatch(AUTH_INVALID); break
            default: storeService.store.dispatch(ERROR_GENERIC, error.message); break
          }
        }
      }
    })

    const apolloClient = new ApolloClient({
      link: ApolloLink.from([
        logoutLink,
        authLink,
        httpLink
      ]),
      cache: new InMemoryCache(),
      connectToDevTools: true,
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    })

    this.client = apolloClient
  }
}

export default ApolloClientService
