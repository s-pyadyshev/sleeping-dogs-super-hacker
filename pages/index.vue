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
definePageMeta({
  title: 'How to Play - Sleeping Dogs Super Hacker'
})

useSeoMeta({
  title: 'How to Play - Sleeping Dogs Super Hacker',
  description: 'Learn how to play the Sleeping Dogs camera hacking mini-game'
})
</script>