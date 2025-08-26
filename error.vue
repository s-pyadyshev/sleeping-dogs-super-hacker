<template>
  <div class="error-layout">
    <div class="container">
      <div class="error-content card">
        <h1 class="error-title">{{ error.statusCode }}</h1>
        <h2 class="error-subtitle">
          {{ error.statusCode === 404 ? 'Page Not Found' : 'An Error Occurred' }}
        </h2>
        <p class="error-message">
          {{ error.statusMessage || 'Something went wrong. Please try again later.' }}
        </p>
        <div class="error-actions">
          <NuxtLink to="/" class="button button-primary">
            Go Home
          </NuxtLink>
          <button @click="handleError" class="button">
            {{ error.statusCode === 404 ? 'Go Back' : 'Try Again' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = async () => {
  if (props.error.statusCode === 404) {
    await navigateTo(-1)
  } else {
    await clearError({ redirect: '/' })
  }
}

// SEO
useSeoMeta({
  title: `${props.error.statusCode} - Error - Sleeping Dogs Super Hacker`,
  description: 'An error occurred while loading the page.',
  robots: 'noindex, nofollow'
})
</script>

<style lang="scss" scoped>
.error-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('~/assets/images/watch-dogs.jpg');
  background-size: cover;
  background-position: center;
}

.error-content {
  text-align: center;
  max-width: 500px;
  margin: 2rem;
}

.error-title {
  font-size: 4rem;
  font-weight: 700;
  color: var(--color-invalid-digit);
  margin-bottom: 1rem;
  font-family: $font-family-secondary;
}

.error-subtitle {
  font-size: 2rem;
  color: var(--card-text-color);
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  .button {
    min-width: 120px;
  }
}
</style>