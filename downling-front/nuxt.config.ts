export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 5173
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@pinia/nuxt',
  ],
  pinia: {
    storesDirs: ['./store/**',],
  },
})
