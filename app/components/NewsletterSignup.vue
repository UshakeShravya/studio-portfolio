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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

input[type='email'] {
  flex: 1;
  min-width: 200px;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  padding: 0.5rem 1.25rem;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.feedback {
  font-size: 0.9rem;
  margin: 0;
}

.feedback.success { color: #2e7d32; }
.feedback.duplicate { color: #e65100; }
.feedback.error { color: #c62828; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
