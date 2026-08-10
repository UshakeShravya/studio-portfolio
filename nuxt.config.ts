// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    // Server-only secrets — never exposed to the browser
    contentfulSpaceId: '',
    contentfulAccessToken: '',
    mailchimpApiKey: '',
    mailchimpServerPrefix: '',
    mailchimpAudienceId: '',
  },
})
