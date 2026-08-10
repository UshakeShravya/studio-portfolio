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
    <div class="container">

      <div class="page-hero">
        <h1>Studio Portfolio</h1>
        <p>Writing and work from the studio.</p>
      </div>

      <section class="page-section">
        <h2 class="section-heading">Posts</h2>
        <div v-if="data?.postCollection.items.length" class="card-grid">
          <article
            v-for="post in data.postCollection.items"
            :key="post.slug"
            class="card"
          >
            <p class="card-title">
              <NuxtLink :to="`/posts/${post.slug}`">{{ post.title }}</NuxtLink>
            </p>
            <div class="card-meta">
              <time :datetime="post.publishDate">{{ formatDate(post.publishDate) }}</time>
              <span v-if="post.author">{{ post.author.name }}</span>
            </div>
          </article>
        </div>
        <p v-else>No posts yet.</p>
      </section>

      <section class="page-section">
        <h2 class="section-heading">Case Studies</h2>
        <div v-if="data?.caseStudyCollection.items.length" class="card-grid">
          <article
            v-for="cs in data.caseStudyCollection.items"
            :key="cs.slug"
            class="card"
          >
            <p class="card-title">
              <NuxtLink :to="`/case-studies/${cs.slug}`">{{ cs.title }}</NuxtLink>
            </p>
            <p v-if="cs.client" class="card-client">{{ cs.client }}</p>
            <div class="card-meta">
              <time :datetime="cs.publishDate">{{ formatDate(cs.publishDate) }}</time>
              <span v-if="cs.author">{{ cs.author.name }}</span>
            </div>
          </article>
        </div>
        <p v-else>No case studies yet.</p>
      </section>

    </div>
  </main>
</template>
