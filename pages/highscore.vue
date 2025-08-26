<template>
  <div>
    <!-- Scoreboard component will be implemented in Phase 3 -->
    <div class="card">
      <h2>{{ $t('highscore.title') }}</h2>
      <p>Scoreboard will be implemented in Phase 3</p>
    </div>
  </div>
</template>

<script setup>
// SEO and Meta
definePageMeta({
  title: 'Highscore - Sleeping Dogs Super Hacker',
  description: 'View the top scores and statistics for the Sleeping Dogs Super Hacker game.',
  layout: 'default',
  middleware: 'scoreboard'
})

useSeoMeta({
  title: 'Highscore - Sleeping Dogs Super Hacker',
  description: 'View the top scores and statistics for the Sleeping Dogs Super Hacker game.',
  ogTitle: 'Highscore - Sleeping Dogs Super Hacker',
  ogDescription: 'Check out the leaderboard and see how you rank against other players.',
  ogImage: '/og-image.jpg',
  keywords: 'highscore, leaderboard, sleeping dogs game, top scores'
})

// Page transition
definePageTransition({
  name: 'page',
  mode: 'out-in'
})
</script>