import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { createHttpLink } from 'apollo-link-http'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
  fetch
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

console.log('Setting apollo client', apolloClient)

export default apolloClient
