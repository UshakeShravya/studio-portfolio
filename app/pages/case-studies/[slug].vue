<script setup lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import type { Document } from '@contentful/rich-text-types'
import type { CaseStudy } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

interface CaseStudyData {
  caseStudyCollection: { items: CaseStudy[] }
}

const { data, error } = await useAsyncData<CaseStudyData>(`case-study-${slug}`, () =>
  $fetch('/api/content/case-study', { query: { slug } })
)

const caseStudy = computed(() => data.value?.caseStudyCollection.items[0] ?? null)

const bodyHtml = computed(() =>
  caseStudy.value?.body ? documentToHtmlString(caseStudy.value.body.json as Document) : ''
)

if (!caseStudy.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found' })
}
</script>

<template>
  <main v-if="caseStudy">
    <div class="container article-container">

      <NuxtLink to="/" class="back-link">← Back to home</NuxtLink>

      <header class="article-header">
        <h1>{{ caseStudy.title }}</h1>
        <div class="article-meta">
          <time :datetime="caseStudy.publishDate">{{ formatDate(caseStudy.publishDate) }}</time>
          <span v-if="caseStudy.author">{{ caseStudy.author.name }}</span>
        </div>
      </header>

      <div v-if="caseStudy.coverImage" class="article-cover">
        <img
          :src="caseStudy.coverImage.url"
          :alt="caseStudy.coverImage.description ?? caseStudy.title"
        />
      </div>

      <div v-if="caseStudy.client || caseStudy.results" class="article-facts">
        <p v-if="caseStudy.client"><strong>Client:</strong> {{ caseStudy.client }}</p>
        <p v-if="caseStudy.results"><strong>Results:</strong> {{ caseStudy.results }}</p>
      </div>

      <div v-if="bodyHtml" class="prose" v-html="bodyHtml" />

    </div>
  </main>
</template>
