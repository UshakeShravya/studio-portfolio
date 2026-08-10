<script setup lang="ts">
import type { Post, CaseStudy } from '~/types'

interface IndexData {
  postCollection: { items: Post[] }
  caseStudyCollection: { items: CaseStudy[] }
}

const { data } = await useAsyncData<IndexData>('index', () =>
  $fetch('/api/content')
)
</script>

<template>
  <main>
    <h1>Studio Portfolio</h1>

    <section>
      <h2>Posts</h2>
      <ul v-if="data?.postCollection.items.length">
        <li v-for="post in data.postCollection.items" :key="post.slug">
          <NuxtLink :to="`/posts/${post.slug}`">{{ post.title }}</NuxtLink>
          <time :datetime="post.publishDate">{{ post.publishDate }}</time>
        </li>
      </ul>
      <p v-else>No posts yet.</p>
    </section>

    <section>
      <h2>Case Studies</h2>
      <ul v-if="data?.caseStudyCollection.items.length">
        <li v-for="cs in data.caseStudyCollection.items" :key="cs.slug">
          <NuxtLink :to="`/case-studies/${cs.slug}`">{{ cs.title }}</NuxtLink>
          <p v-if="cs.client">Client: {{ cs.client }}</p>
          <time :datetime="cs.publishDate">{{ cs.publishDate }}</time>
        </li>
      </ul>
      <p v-else>No case studies yet.</p>
    </section>
  </main>
</template>
