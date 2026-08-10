<script setup lang="ts">
// Hardcoded approach: every new post requires a code change and a redeployment.
// There is no CMS, no API, no separation between content and presentation.

const posts = [
  {
    slug: 'why-we-rebuilt-our-site-with-contentful',
    title: 'Why We Rebuilt Our Site with Contentful',
    date: 'July 24, 2026',
    author: 'Shravya Ushake',
    body: `We had been running our studio site on a hand-rolled static setup for three
years. Every time we wanted to publish a new post, someone with repo access had
to create a file, write the content in Markdown, open a pull request, wait for
CI, and merge. Non-technical team members couldn't touch it at all.

Moving to a headless CMS changed that. Now anyone on the team can log into
Contentful, hit "Add entry", and the post is live within minutes — no
deployment required.`,
  },
  {
    slug: 'designing-content-models-that-scale',
    title: 'Designing Content Models That Scale',
    date: 'July 28, 2026',
    author: 'Shravya Ushake',
    body: `The mistake most teams make is modeling their CMS content types around their
current page layout. When the layout changes — and it always does — the content
model breaks and you're doing a painful migration.

The better approach is to model around the content itself: what is this thing,
who created it, when was it published? Let the presentation layer decide how to
display it. A Post is a Post regardless of whether it renders as a card, a full
page, or a teaser in an email.`,
  },
  {
    slug: '5-lessons-from-migrating-to-a-headless-cms',
    title: '5 Lessons from Migrating to a Headless CMS',
    date: 'July 28, 2026',
    author: 'Alex Rivera',
    body: `1. Start with a content audit. You probably have more content types than you
think, and half of them can be consolidated.

2. Model for editors, not developers. The field names and structures your
engineers prefer are not the ones your writers will understand.

3. Rich text is a trap if you let it get too expressive. Constrain what
embedded components editors can insert, or you'll spend months building
renderers for one-off widgets.

4. Plan your GraphQL queries early. Contentful's schema reflects your content
model exactly — if your model is messy, your queries will be messy.

5. Use preview tokens from day one. Waiting until launch to set up draft
previews means editors will never trust the system.`,
  },
  
]

const selectedSlug = ref(posts[0].slug)
const selectedPost = computed(() => posts.find(p => p.slug === selectedSlug.value)!)
</script>

<template>
  <div style="font-family: sans-serif; max-width: 900px; margin: 2rem auto; padding: 0 1.5rem;">
    <h1 style="font-size: 1.5rem; margin-bottom: 0.25rem;">Hardcoded Blog Demo</h1>
    <p style="color: #666; margin-bottom: 2rem;">
      This is what the site would look like with posts living directly in the source code.
      To add a new post a developer must edit this file, commit, and redeploy.
    </p>

    <div style="display: flex; gap: 2rem;">

      <!-- Sidebar: post list -->
      <nav style="min-width: 200px;">
        <p style="font-size: 0.8rem; font-weight: 600; text-transform: uppercase;
                  letter-spacing: 0.05em; color: #999; margin-bottom: 0.75rem;">Posts</p>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
          <li v-for="post in posts" :key="post.slug">
            <button
              @click="selectedSlug = post.slug"
              :style="{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.9rem',
                padding: '0.35rem 0.5rem',
                borderRadius: '4px',
                width: '100%',
                fontWeight: selectedSlug === post.slug ? '600' : '400',
                background: selectedSlug === post.slug ? '#f3f4f6' : 'transparent',
              }"
            >
              {{ post.title }}
            </button>
          </li>
        </ul>
      </nav>

      <!-- Main: selected post -->
      <article style="flex: 1;">
        <header style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
          <h2 style="font-size: 1.4rem; margin-bottom: 0.5rem;">{{ selectedPost.title }}</h2>
          <p style="color: #6b7280; font-size: 0.875rem; margin: 0;">
            {{ selectedPost.date }} · {{ selectedPost.author }}
          </p>
        </header>
        <div style="line-height: 1.75; white-space: pre-wrap;">{{ selectedPost.body }}</div>
      </article>

    </div>

    <aside style="margin-top: 3rem; padding: 1rem 1.25rem; background: #fef9c3;
                  border: 1px solid #fde047; border-radius: 6px; font-size: 0.875rem;">
      <strong>The problem with this approach:</strong> adding the post "Designing Content
      Models That Scale" required opening a code editor, writing TypeScript, pushing a commit,
      and waiting for a deploy. With Contentful, the same action takes 2 minutes in a browser
      and requires zero developer involvement.
    </aside>
  </div>
</template>
