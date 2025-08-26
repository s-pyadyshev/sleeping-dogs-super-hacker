<template>
  <nav class="game-menu">
    <ul class="game-menu__list">
      <li class="game-menu__item">
        <NuxtLink 
          to="/" 
          :class="{ 'is-active': isActiveRoute('/') }"
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
          :class="{ 'is-active': isActiveRoute('/about') }"
        >
          {{ $t('menu.about') }}
        </NuxtLink>
      </li>
      <li class="game-menu__item">
        <NuxtLink 
          to="/highscore" 
          :class="{ 'is-active': isActiveRoute('/highscore') }"
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
import { useNavigation } from '~/composables/useNavigation'

// Navigation composable
const { navigateToGame, isActiveRoute } = useNavigation()
const { gameStore } = useGame()

const { locale, locales } = useI18n()
const route = useRoute()

const availableLocales = computed(() => locales.value)

const removeInputBlur = (event) => {
  event.target.blur()
}

const debouncedStartGame = debounce(navigateToGame, 1000)

const handleStartClick = (event) => {
  removeInputBlur(event)
  
  debouncedStartGame()
}

const switchLanguage = (code) => {
  locale.value = code
}
</script>

<style lang="scss" scoped>
.game-menu {
  padding: var(--spacing-sm);
  color: var(--link-color);
  text-transform: uppercase;
  
  @include mobile {
    padding: var(--spacing-xs);
  }

  @include desktop {
    padding: 0;
  }

  button {
    text-transform: uppercase;
    border: 2px solid transparent;
  }

  a,
  button {
    display: inline-block;
    padding: var(--spacing-sm) var(--spacing-md);
    color: inherit;
    font-weight: 500;
    font-size: $font-size-lg;
    line-height: 1.5;
    text-decoration: none;
    background: none;
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    outline: none;
    transition: all var(--transition-duration) var(--transition-timing);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }

    @include tablet {
      padding: var(--spacing-md) var(--spacing-lg);
      font-size: $font-size-2xl;
    }
    
    @include mobile {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: $font-size-base;
    }

    &:focus,
    &:hover,
    &:active,
    &.is-active {
      border-color: var(--color-white);
      box-shadow: 
        inset 0 0 12px 2px rgba(254, 242, 164, 0.3), 
        0 0 16px 2px rgba(254, 242, 164, 0.4);
      transform: translateY(-2px);
      text-shadow: 0 0 10px rgba(254, 242, 164, 0.8);
    }
    
    &.is-active {
      background: rgba(254, 242, 164, 0.1);
      backdrop-filter: blur(5px);
    }
  }

  &__item {
    position: relative;
    
    &:not(:last-child) {
      margin-bottom: var(--spacing-xs);
      
      @include tablet {
        margin-bottom: var(--spacing-md);
      }
    }
  }

  &__list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
    
    @include mobile {
      justify-content: center;
      gap: var(--spacing-xs);
    }

    @include desktop {
      display: block;
      gap: 0;
    }
  }
}
</style>