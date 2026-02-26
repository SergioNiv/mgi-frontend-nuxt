// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/image',
  ],
  css: ['~/assets/css/main.css'],
  pinia: {
    storesDirs: ['app/stores/**'],
  },
  app: {
    head: {
      bodyAttrs: {
        class: 'min-w-[400px]',
      },
    },
  },
  routeRules: {
    '/': { redirect: '/products' }
  }
})