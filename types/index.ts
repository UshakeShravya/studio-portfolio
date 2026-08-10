import type { Document } from '@contentful/rich-text-types'

export interface Author {
  name: string
  bio?: string
  picture?: {
    url: string
    description?: string
  }
}

export interface Post {
  title: string
  slug: string
  publishDate: string
  body?: {
    json: Document
  }
  coverImage?: {
    url: string
    description?: string
  }
  author?: Author
}

export interface CaseStudy {
  title: string
  slug: string
  publishDate: string
  client?: string
  results?: string
  body?: {
    json: Document
  }
  coverImage?: {
    url: string
    description?: string
  }
  author?: Author
}
