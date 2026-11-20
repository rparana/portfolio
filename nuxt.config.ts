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
  ],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  typescript: {
    strict: true,
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
      title: 'Rafael Paraná — Frontend Architect & Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Portfolio of Rafael Paraná — Principal Frontend Architect & Software Engineer.',
        },
        { name: 'theme-color', content: '#F8FAFC' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Rafael Paraná' },
        { property: 'og:url', content: 'https://rafaelparana.me' },
        {
          property: 'og:title',
          content: 'Rafael Paraná — Frontend Architect & Software Engineer',
        },
        {
          property: 'og:description',
          content: 'Portfolio of Rafael Paraná — Principal Frontend Architect & Software Engineer.',
        },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'canonical', href: 'https://rafaelparana.me' },
      ],
    },
  },
})
