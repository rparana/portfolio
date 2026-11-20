import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
  },

  site: {
    url: 'https://rafaelparana.me',
    name: 'Rafael Paraná — Principal Software Architect & Hands-on Tech Lead',
  },

  robots: {
    allow: ['/'],
    sitemap: ['https://rafaelparana.me/sitemap.xml'],
  },

  sitemap: {
    zeroRuntime: true,
  },

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },

  nitro: {
    preset: 'cloudflare-pages',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/pt'],
    },
  },

  fonts: {
    families: [
      {
        name: 'Plus Jakarta Sans',
        provider: 'google',
        weights: [400, 500, 600, 700],
      },
      {
        name: 'JetBrains Mono',
        provider: 'google',
        weights: [400, 500],
      },
    ],
  },

  i18n: {
    baseUrl: 'https://rafaelparana.me',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'pt',
        language: 'pt-BR',
        name: 'Português',
        file: 'pt.json',
      },
    ],
  },

  app: {
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#F8FAFC' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192x192.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
})
