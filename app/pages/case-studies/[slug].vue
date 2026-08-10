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
    <article>
      <header>
        <h1>{{ caseStudy.title }}</h1>
        <time :datetime="caseStudy.publishDate">{{ caseStudy.publishDate }}</time>
        <p v-if="caseStudy.author">By {{ caseStudy.author.name }}</p>
      </header>

      <img
        v-if="caseStudy.coverImage"
        :src="caseStudy.coverImage.url"
        :alt="caseStudy.coverImage.description ?? caseStudy.title"
      />

      <p v-if="caseStudy.client"><strong>Client:</strong> {{ caseStudy.client }}</p>
      <p v-if="caseStudy.results"><strong>Results:</strong> {{ caseStudy.results }}</p>

      <div v-if="bodyHtml" v-html="bodyHtml" />
    </article>

    <NuxtLink to="/">← Back to home</NuxtLink>
  </main>
</template>
