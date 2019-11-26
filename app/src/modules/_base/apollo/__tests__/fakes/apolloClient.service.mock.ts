import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'
import { injectable } from 'inversify-props'

import ApolloClientServiceInterface from '../../apolloClient.service.interface'

@injectable()
class ApolloClientService implements ApolloClientServiceInterface {
  public client: ApolloClient<any>

  public constructor () {
    const httpLink = createHttpLink({
      uri: 'http://localhost:3000/graphql',
      fetch: fetch as any
    })

    // Create the apollo client
    const apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    })

    this.client = apolloClient
  }
}

export default ApolloClientService
