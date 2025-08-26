export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],

  css: [
    '~/assets/styles/main.scss'
  ],

  googleFonts: {
    families: {
      'Barlow Condensed': [500],
      'DIN Condensed': [700]
    },
    display: 'swap'
  },

  i18n: {
    locales: [
      { code: 'en', name: 'English' },
      { code: 'ru', name: 'Русский' }
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts'
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID
    }
  },

  app: {
    head: {
      title: 'Sleeping Dogs Super Hacker',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Sleeping Dogs Hacking minigame made with Nuxt 3 and Vue 3' 
        },
        { name: 'author', content: 'Sleeping Dogs Super Hacker Team' },
        { name: 'keywords', content: 'sleeping dogs, hacking game, bulls and cows, puzzle game, vue3, nuxt3' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    }
  },

  // Route rules for better SEO and performance
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/game': { ssr: false }, // Game page doesn't need SSR
    '/highscore': { isr: true }, // Incremental Static Regeneration for scores
    '/404': { prerender: true }
  },

  // Experimental features
  experimental: {
    payloadExtraction: false // Better performance for SPA pages
  }
})