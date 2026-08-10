<script setup lang="ts">
const email = ref('')
const status = ref<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle')
const message = ref('')

async function handleSubmit() {
  if (!email.value) return

  status.value = 'loading'
  message.value = ''

  try {
    const result = await $fetch<{ success: boolean; message: string }>('/api/subscribe', {
      method: 'POST',
      body: { email: email.value },
    })

    if (result.success) {
      status.value = 'success'
      email.value = ''
    } else {
      status.value = 'duplicate'
    }
    message.value = result.message
  } catch (error: unknown) {
    status.value = 'error'
    message.value =
      (error as { data?: { statusMessage?: string } }).data?.statusMessage ??
      'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <div class="newsletter-signup">
    <h3>Stay in the loop</h3>
    <p>Get new posts and case studies delivered to your inbox.</p>

    <form v-if="status !== 'success'" @submit.prevent="handleSubmit">
      <label for="newsletter-email" class="sr-only">Email address</label>
      <input
        id="newsletter-email"
        v-model="email"
        type="email"
        placeholder="you@example.com"
        required
        :disabled="status === 'loading'"
      />
      <button type="submit" :disabled="status === 'loading'">
        {{ status === 'loading' ? 'Subscribing…' : 'Subscribe' }}
      </button>
    </form>

    <p v-if="message" :class="['feedback', status]">{{ message }}</p>
  </div>
</template>

<style scoped>
.newsletter-signup {
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.newsletter-signup h3 {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.newsletter-signup > p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0;
}

form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

input[type='email'] {
  flex: 1;
  min-width: 200px;
  padding: 0.55rem 0.875rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 0.925rem;
  color: var(--color-text);
  background: var(--color-bg);
  outline: none;
  transition: border-color 0.15s;
}

input[type='email']:focus {
  border-color: var(--color-accent);
}

button {
  padding: 0.55rem 1.25rem;
  background: var(--color-accent);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 0.925rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s;
}

button:hover:not(:disabled) {
  background: var(--color-accent-hover);
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.feedback {
  font-size: 0.85rem;
  margin: 0;
}

.feedback.success  { color: #15803d; }
.feedback.duplicate { color: #c2410c; }
.feedback.error    { color: #b91c1c; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
