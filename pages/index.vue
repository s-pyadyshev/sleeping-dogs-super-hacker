<template>
  <article class="instructions card">
    <p>{{ $t('howtoplay.start') }}&nbsp;</p>
    <p>
      <span class="icon icon-invalid-place"></span>
      <span>{{ $t('howtoplay.yellow') }}</span>
    </p>
    <p>
      <span class="icon icon-invalid-digit"></span>
      <span>{{ $t('howtoplay.red') }}</span>
    </p>
    <p>
      <span class="icon icon-valid-digit"></span>
      <span>{{ $t('howtoplay.green') }}</span>
    </p>
    <p>{{ $t('howtoplay.controls') }}</p>
  </article>
</template>

<script setup>
// SEO and Meta
definePageMeta({
  title: 'How to Play - Sleeping Dogs Super Hacker',
  description: 'Learn how to play the Sleeping Dogs camera hacking mini-game. Guess 4 unique digits with Bulls and Cows rules.',
  layout: 'default'
})

useSeoMeta({
  title: 'How to Play - Sleeping Dogs Super Hacker',
  description: 'Learn how to play the Sleeping Dogs camera hacking mini-game. Guess 4 unique digits with Bulls and Cows rules.',
  ogTitle: 'How to Play - Sleeping Dogs Super Hacker',
  ogDescription: 'Master the camera hacking mini-game from Sleeping Dogs. Interactive Bulls and Cows puzzle game.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
  twitterTitle: 'How to Play - Sleeping Dogs Super Hacker',
  twitterDescription: 'Master the camera hacking mini-game from Sleeping Dogs.',
  keywords: 'sleeping dogs, hacking game, bulls and cows, puzzle game, vue3, nuxt3'
})

// Page transition
definePageTransition({
  name: 'page',
  mode: 'out-in'
})
</script>