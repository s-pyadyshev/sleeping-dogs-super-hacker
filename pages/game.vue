<template>
  <div>
    <!-- Game components will be implemented in Phase 3 -->
    <div class="card">
      <h2>Game Page</h2>
      <p>Game components will be implemented in Phase 3</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
import { useCounterStore } from '~/stores/counter'
import { useUIStore } from '~/stores/ui'
  title: 'Game - Sleeping Dogs Super Hacker'
})

useSeoMeta({
const counterStore = useCounterStore()
const uiStore = useUIStore()
const router = useRouter()
// SEO and Meta
  title: 'Game - Sleeping Dogs Super Hacker',
  title: 'Game - Sleeping Dogs Super Hacker',
  description: 'Play the Sleeping Dogs camera hacking mini-game. Crack the 4-digit code!',
  layout: 'default',
  description: 'Play the Sleeping Dogs camera hacking mini-game. Crack the 4-digit code!',
  ogTitle: 'Game - Sleeping Dogs Super Hacker',
  ogDescription: 'Test your skills in this interactive hacking puzzle game.',
  robots: 'noindex, nofollow' // Game pages shouldn't be indexed
})

// Page transition
definePageTransition({
  name: 'game',
  mode: 'out-in'
})

// Lifecycle hooks
onMounted(() => {
  // Initialize game if not already started
  if (!gameStore.isGameStarted && !gameStore.isUnlocked && !gameStore.isGameOver) {
    gameStore.gameStart()
    counterStore.startCounter()
    uiStore.showInfo('Game started! Use WASD or arrow keys to play.')
  }
})

onBeforeUnmount(() => {
  // Pause counter when leaving game page (but don't reset)
  if (counterStore.counterInProgress) {
    counterStore.pauseCounter()
  }
})

// Watch for game state changes
watch(() => gameStore.isUnlocked, (isUnlocked) => {
  if (isUnlocked) {
    counterStore.stopCounter()
    uiStore.showSuccess('Congratulations! You cracked the code!')
  }
})

watch(() => gameStore.isGameOver, (isGameOver) => {
  if (isGameOver) {
    counterStore.stopCounter()
    uiStore.showError('Game Over! The code was: ' + gameStore.code.join(''))
  }
})
</script>