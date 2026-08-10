<template>
  <div>
    <NuxtRouteAnnouncer />

    <header class="site-header">
      <div class="container">
        <NuxtLink to="/" class="site-logo">Studio Portfolio</NuxtLink>
      </div>
    </header>

    <NuxtPage />

    <footer class="site-footer">
      <div class="container">
        <NewsletterSignup />
      </div>
    </footer>
  </div>
</template>
