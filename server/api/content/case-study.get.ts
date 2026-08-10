import type { CaseStudy } from '~/types'

const QUERY = /* GraphQL */ `
  query CaseStudyBySlug($slug: String!) {
    caseStudyCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        publishDate
        client
        results
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

interface CaseStudyResponse {
  caseStudyCollection: { items: CaseStudy[] }
}

export default defineEventHandler((event) => {
  const { slug } = getQuery(event)
  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'slug is required' })
  }
  return queryContentful<CaseStudyResponse>(QUERY, { slug })
})
