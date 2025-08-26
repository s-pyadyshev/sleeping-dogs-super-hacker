<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useUIStore } from '~/stores/ui'

const uiStore = useUIStore()

// Initialize theme on app start
onMounted(() => {
  uiStore.initializeTheme()
})

// Global SEO defaults
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    },
    {
      rel: 'canonical',
      href: 'https://sleeping-dogs-hacker.netlify.app'
    }
  ],
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    }
  ]
})

// Global error handling
onErrorCaptured((error) => {
  console.error('Global error captured:', error)
  uiStore.showError('An unexpected error occurred. Please try again.')
  return false
})
</script>

<style>
/* Global page transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.game-enter-active,
.game-leave-active {
  transition: all 0.4s ease;
}

.game-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.game-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>