import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://rickandmortyapi.com/graphql',
})

// // Cache implementation
// const cache = new InMemoryCache()
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        characters: {
          keyArgs: ['filter'],
          merge(before = { results: [] }, after) {
            const merged = {
              ...after,
              results: [
                ...before.results,
                ...after.results
              ]
            }
            return merged
          }
        },
        episodes: {
          keyArgs: ['filter'],
          merge(before = { results: [] }, after) {
            const merged = {
              ...after,
              results: [
                ...before.results,
                ...after.results
              ]
            }
            return merged
          }
        },
        locations: {
          keyArgs: ['filter'],
          merge(before = {results: []}, after) {
            const merged = {
              ...after,
              results: [
                ...before.results,
                ...after.results
              ]
            }
            return merged
          }
        }
      }
    }
  }
})

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  connectToDevTools: true
})