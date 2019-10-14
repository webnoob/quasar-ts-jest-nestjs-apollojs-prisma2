import ApolloClient from 'apollo-client'
import apolloClient from 'src/boot/apolloClient'

export default class BaseCrudService<T> {
  protected get apolloClientService (): ApolloClient<any> {
    return apolloClient
  }
}
