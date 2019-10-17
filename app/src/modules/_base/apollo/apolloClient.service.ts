import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { injectable } from 'inversify-props'

import IApolloClientService from './apolloClient.service.interface'
import AuthService from '../auth/auth.service'
import { ApolloLink } from 'apollo-link'
import { injectSingleton } from '../../diContainer'

@injectable()
class ApolloClientService implements IApolloClientService {
  public client: ApolloClient<any>

  public constructor (
    @injectSingleton(AuthService) private readonly authService: AuthService
  ) {
    const httpLink = createHttpLink({
      uri: 'http://localhost:3000/graphql',
      fetch: fetch as any
    })

    let authLink: ApolloLink
    let link: ApolloLink

    // If we have an authenticated user, attach the appropriate headers.
    if (this.authService.isAuthenticated) {
      authLink = setContext((_, { headers }) => {
        const token = this.authService.user ? this.authService.user.accessToken : ''

        if (token) {
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          }
        }
      })

      link = authLink.concat(httpLink)
    } else {
      link = httpLink
    }

    const apolloClient = new ApolloClient({
      link,
      cache: new InMemoryCache(),
      connectToDevTools: true
    })

    this.client = apolloClient
  }
}

export default ApolloClientService
