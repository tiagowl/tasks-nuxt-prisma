import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-07-17',
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  nitro: {
    experimental: {
      openAPI: true,
    },
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    credentialsUsername: process.env.CREDENTIALS_USERNAME || 'admin',
    credentialsPassword: process.env.CREDENTIALS_PASSWORD || 'admin123',
    sessionTimeout: process.env.NUXT_SESSION_TIMEOUT || '1440',
  },
  app: {
    head: {
      title: 'TaskFlow - Gerenciamento de Tarefas',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
      ],
    },
  },
  typescript: {
    strict: true,
    shim: false,
  },
})
