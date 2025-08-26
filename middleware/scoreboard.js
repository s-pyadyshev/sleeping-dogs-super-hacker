export default defineNuxtRouteMiddleware(async (to, from) => {
  const { scoreboardStore } = useGame()
  
  // Pre-fetch scores when navigating to highscore page
  if (to.path === '/highscore' && !scoreboardStore.hasScores && !scoreboardStore.isLoading) {
    try {
      await scoreboardStore.fetchScores()
    } catch (error) {
      console.warn('Failed to pre-fetch scores:', error)
    }
  }
})