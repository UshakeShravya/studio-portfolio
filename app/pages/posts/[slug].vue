<script setup lang="ts">
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import type { Document } from '@contentful/rich-text-types'
import type { Post } from '~/types'

const route = useRoute()
const slug = route.params.slug as string

interface PostData {
  postCollection: { items: Post[] }
}

const { data, error } = await useAsyncData<PostData>(`post-${slug}`, () =>
  $fetch('/api/content/post', { query: { slug } })
)

const post = computed(() => data.value?.postCollection.items[0] ?? null)

const bodyHtml = computed(() =>
  post.value?.body ? documentToHtmlString(post.value.body.json as Document) : ''
)

if (!post.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}
</script>

<template>
  <main v-if="post">
    <div class="container article-container">

      <NuxtLink to="/" class="back-link">← Back to home</NuxtLink>

      <header class="article-header">
        <h1>{{ post.title }}</h1>
        <div class="article-meta">
          <time :datetime="post.publishDate">{{ formatDate(post.publishDate) }}</time>
          <span v-if="post.author">{{ post.author.name }}</span>
        </div>
      </header>

      <div v-if="post.coverImage" class="article-cover">
        <img
          :src="post.coverImage.url"
          :alt="post.coverImage.description ?? post.title"
        />
      </div>

      <div v-if="bodyHtml" class="prose" v-html="bodyHtml" />

    </div>
  </main>
</template>
