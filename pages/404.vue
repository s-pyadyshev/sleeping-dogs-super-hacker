<template>
  <div class="error-page card">
    <h1 class="error-page__title">404</h1>
    <h2 class="error-page__subtitle">Page Not Found</h2>
    <p class="error-page__message">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <div class="error-page__actions">
      <NuxtLink to="/" class="button button-primary">
        {{ $t('menu.howtoplay') }}
      </NuxtLink>
      <button @click="$router.back()" class="button">
        Go Back
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: '404 - Page Not Found',
  description: 'The page you are looking for could not be found.',
  layout: 'default'
})

useSeoMeta({
  title: '404 - Page Not Found - Sleeping Dogs Super Hacker',
  description: 'The page you are looking for could not be found.',
  robots: 'noindex, nofollow'
})

// Page transition
definePageTransition({
  name: 'page',
  mode: 'out-in'
})
</script>

<style lang="scss" scoped>
.error-page {
  text-align: center;
  max-width: 500px;
  margin: 0 auto;

  &__title {
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-invalid-digit);
    margin-bottom: 1rem;
    font-family: $font-family-secondary;
  }

  &__subtitle {
    font-size: 2rem;
    color: var(--card-text-color);
    margin-bottom: 1rem;
  }

  &__message {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;

    .button {
      min-width: 120px;
    }
  }
}
</style>