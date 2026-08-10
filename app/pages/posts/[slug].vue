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
    <article>
      <header>
        <h1>{{ post.title }}</h1>
        <time :datetime="post.publishDate">{{ post.publishDate }}</time>
        <p v-if="post.author">By {{ post.author.name }}</p>
      </header>

      <img
        v-if="post.coverImage"
        :src="post.coverImage.url"
        :alt="post.coverImage.description ?? post.title"
      />

      <div v-if="bodyHtml" v-html="bodyHtml" />
    </article>

    <NuxtLink to="/">← Back to home</NuxtLink>
  </main>
</template>
