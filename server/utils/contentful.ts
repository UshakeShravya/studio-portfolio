import { GraphQLClient } from 'graphql-request'

export function queryContentful<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const config = useRuntimeConfig()

  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${config.contentfulSpaceId}`

  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${config.contentfulAccessToken}`,
    },
  })

  return client.request<T>(query, variables)
}
