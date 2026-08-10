import type { Post, CaseStudy } from '~/types'

const QUERY = /* GraphQL */ `
  query IndexPage {
    postCollection(order: publishDate_DESC) {
      items {
        title
        slug
        publishDate
        author {
          name
        }
      }
    }
    caseStudyCollection(order: publishDate_DESC) {
      items {
        title
        slug
        publishDate
        client
        results
        author {
          name
        }
      }
    }
  }
`

interface IndexResponse {
  postCollection: { items: Post[] }
  caseStudyCollection: { items: CaseStudy[] }
}

export default defineEventHandler(() => queryContentful<IndexResponse>(QUERY))
