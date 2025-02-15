export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],
  ssr: false,
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: import.meta.env.NUXT_PUBLIC_API_BASE,
    },
  },
  devServer: {
    port: 5173,
  },
  compatibilityDate: '2024-04-03',
  eslint: {
    config: {
      stylistic: true, // <---
    },
  },
  pinia: {
    storesDirs: ['./store/**'],
  },
})
