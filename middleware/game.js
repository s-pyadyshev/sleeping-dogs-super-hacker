export default defineNuxtRouteMiddleware((to, from) => {
  const { gameStore } = useGame()
  
  // If trying to access game page without an active game, redirect to home
  if (to.path === '/game' && !gameStore.isGameStarted && !gameStore.isUnlocked && !gameStore.isGameOver) {
    return navigateTo('/')
  }
  
  // If game is over or won, allow access to game page to show results
  if (to.path === '/game' && (gameStore.isGameOver || gameStore.isUnlocked)) {
    return
  }
})