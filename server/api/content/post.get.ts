import type { Post } from '~/types'

const QUERY = /* GraphQL */ `
  query PostBySlug($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        publishDate
        body {
          json
        }
        coverImage {
          url
          description
        }
        author {
          name
          bio
          picture {
            url
          }
        }
      }
    }
  }
`

interface PostResponse {
  postCollection: { items: Post[] }
}

export default defineEventHandler((event) => {
  const { slug } = getQuery(event)
  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }
  return queryContentful<PostResponse>(QUERY, { slug })
})
