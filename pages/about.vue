<template>
  <div class="about card">
    {{ $t('about.text1') }}&nbsp;
    <a
      class="link"
      href="https://en.wikipedia.org/wiki/Sleeping_Dogs_(video_game)"
      target="_blank"
      rel="noopener noreferrer"
    >
      Sleeping Dogs
    </a>
    &nbsp;{{ $t('about.text2') }}&nbsp;
    <a 
      class="link" 
      href="https://en.wikipedia.org/wiki/Bulls_and_Cows"
      target="_blank"
      rel="noopener noreferrer"
    >
      Bulls and Cows
    </a>
    . {{ $t('about.text3') }}&nbsp;
    <a
      href="https://store.steampowered.com/app/202170/Sleeping_Dogs/"
      class="link"
      target="_blank"
      rel="noopener noreferrer"
    >
      Steam
    </a>
    .
    <p>
      {{ $t('about.text4') }}:&nbsp;
      <a
        class="link"
        href="https://nuxt.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Nuxt 3
      </a>
      ,&nbsp;
      <a
        class="link"
        href="https://vuejs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Vue 3
      </a>
      ,&nbsp;
      <a
        class="link"
        href="https://pinia.vuejs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Pinia
      </a>
      ,&nbsp;
      <a
        class="link"
        href="https://firebase.google.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Firebase
      </a>
      .
    </p>
    <p>{{ $t('about.text5') }}</p>
    <p>{{ $t('about.text6') }}</p>
    <p>
      {{ $t('about.text7') }}:&nbsp;
      <a
        class="link"
        href="https://github.com/s-pyadyshev/sleeping-dogs-super-hacker"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
      .
    </p>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'About - Sleeping Dogs Super Hacker'
})

useSeoMeta({
  title: 'About - Sleeping Dogs Super Hacker',
  description: 'Learn about the Sleeping Dogs Super Hacker game project'
})
</script>