export const useNavigation = () => {
  const router = useRouter()
  const route = useRoute()
  const { gameStore, uiStore } = useGame()

  // Navigation guards
  const canLeaveGame = () => {
    if (gameStore.isGameInProgress) {
      return confirm('Are you sure you want to leave the game? Your progress will be lost.')
    }
    return true
  }

  // Safe navigation with game state checks
  const navigateToGame = () => {
    if (!gameStore.isGameStarted) {
      gameStore.gameStart()
      uiStore.showInfo('New game started!')
    }
    return navigateTo('/game')
  }

  const navigateToHome = () => {
    if (canLeaveGame()) {
      return navigateTo('/')
    }
  }

  const navigateToHighscore = () => {
    if (canLeaveGame()) {
      return navigateTo('/highscore')
    }
  }

  const navigateToAbout = () => {
    if (canLeaveGame()) {
      return navigateTo('/about')
    }
  }

  // Breadcrumb generation
  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { name: 'Home', path: '/', active: route.path === '/' }
    ]

    if (route.path === '/game') {
      breadcrumbs.push({ name: 'Game', path: '/game', active: true })
    } else if (route.path === '/about') {
      breadcrumbs.push({ name: 'About', path: '/about', active: true })
    } else if (route.path === '/highscore') {
      breadcrumbs.push({ name: 'Highscore', path: '/highscore', active: true })
    }

    return breadcrumbs
  }

  // Page title generation
  const getPageTitle = () => {
    const baseTitle = 'Sleeping Dogs Super Hacker'
    
    switch (route.path) {
      case '/':
        return `How to Play - ${baseTitle}`
      case '/game':
        return `Game - ${baseTitle}`
      case '/about':
        return `About - ${baseTitle}`
      case '/highscore':
        return `Highscore - ${baseTitle}`
      default:
        return baseTitle
    }
  }

  // Check if current route is active
  const isActiveRoute = (path) => {
    return route.path === path
  }

  return {
    // Navigation methods
    navigateToGame,
    navigateToHome,
    navigateToHighscore,
    navigateToAbout,
    canLeaveGame,
    
    // Utility methods
    getBreadcrumbs,
    getPageTitle,
    isActiveRoute,
    
    // Current route info
    currentPath: computed(() => route.path),
    currentQuery: computed(() => route.query),
    currentParams: computed(() => route.params)
  }
}