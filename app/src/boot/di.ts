// @ts-ignore
import injector from 'vue-inject'
import BookService from 'src/modules/book/book.service'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { createDecorator } from 'vue-class-component'
import fetch from 'node-fetch'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch: fetch as any
})

const a = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

injector.constant('apolloClientService', a)
injector.service('bookService', ['apolloClientService'], BookService)

export default injector

export const InjectDependant = createDecorator((options, key) => {
  if (!options.computed) options.computed = {}
  const dep = injector.get(key)
  (options as any).computed![key] = () => {
    return dep
  }
})
