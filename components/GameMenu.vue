<template>
  <nav class="game-menu">
    <ul class="game-menu__list">
      <li class="game-menu__item">
        <NuxtLink 
          to="/" 
          :class="{ 'is-active': $route.path === '/' }"
        >
          {{ $t('menu.howtoplay') }}
        </NuxtLink>
      </li>
      <li class="game-menu__item">
        <button class="button" @click="handleStartClick">
          {{ gameStore.isGameStarted ? $t('menu.restart') : $t('menu.start') }}
        </button>
      </li>
      <li class="game-menu__item">
        <NuxtLink 
          to="/about" 
          :class="{ 'is-active': $route.path === '/about' }"
        >
          {{ $t('menu.about') }}
        </NuxtLink>
      </li>
      <li class="game-menu__item">
        <NuxtLink 
          to="/highscore" 
          :class="{ 'is-active': $route.path === '/highscore' }"
        >
          {{ $t('menu.highscore') }}
        </NuxtLink>
      </li>
      <li>
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          :class="{ 'is-active': $i18n.locale.value === locale.code }"
          type="button"
          @click="switchLanguage(locale.code)"
        >
          {{ locale.name }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { debounce } from '~/utils'
import { useGameStore } from '~/stores/game'
import { useCounterStore } from '~/stores/counter'

// Stores
const gameStore = useGameStore()
const counterStore = useCounterStore()

const { locale, locales } = useI18n()
const router = useRouter()

const availableLocales = computed(() => locales.value)

const removeInputBlur = (event) => {
  event.target.blur()
}

const startGame = () => {
  router.push('/game')
  gameStore.gameStart()
  counterStore.startCounter()
}

const debouncedStartGame = debounce(startGame, 1000)

const handleStartClick = (event) => {
  removeInputBlur(event)
  
  if (gameStore.isGameStarted) {
    // Restart game
    gameStore.gameRestart()
    counterStore.resetCounter()
    counterStore.startCounter()
    router.push('/game')
  } else {
    // Start new game
    debouncedStartGame()
  }
}

const switchLanguage = (code) => {
  locale.value = code
}
</script>

<style lang="scss" scoped>
.game-menu {
  padding: 8px;
  color: var(--link-color);
  text-transform: uppercase;

  @include desktop {
    padding: 0;
  }

  button {
    text-transform: uppercase;
    border: 0;
    border: 1px solid transparent;
  }

  a,
  button {
    display: inline-block;
    padding: 8px;
    color: inherit;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.5;
    text-decoration: none;
    background: none;
    border: 1px solid transparent;
    border-radius: 8px;
    outline: none;
    transition-duration: var(--transition-duration);
    transition-property: border, box-shadow;

    @include tablet {
      padding: 8px 12px;
      font-size: 32px;
    }

    &:focus,
    &:hover,
    &:active,
    &.is-active {
      border: 1px solid var(--color-white);
      box-shadow: inset 0 0 8px 1px var(--link-color), 0 0 8px 1px var(--link-color);
      transition-duration: var(--transition-duration);
      transition-property: border, box-shadow;
    }
  }

  &__item {
    &:not(:last-child) {
      @include tablet {
        margin-bottom: 16px;
      }
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;

    @include desktop {
      display: block;
    }
  }
}
</style>