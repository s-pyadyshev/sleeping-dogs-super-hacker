import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore'

export const useScoreboardStore = defineStore('scoreboard', () => {
  // State
  const scores = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const stats = ref({
    totalGames: 0,
    wins: 0,
    losses: 0,
    averageTime: 0,
    averageAttempts: 0
  })

  // Getters
  const topScores = computed(() => 
    scores.value
      .filter(score => score.isWin)
      .sort((a, b) => {
        // Sort by attempts (fewer is better), then by time (less is better)
        if (a.attemptsUsed !== b.attemptsUsed) {
          return a.attemptsUsed - b.attemptsUsed
        }
        return a.timeSpent - b.timeSpent
      })
      .slice(0, 10)
  )

  const winRate = computed(() => {
    if (stats.value.totalGames === 0) return 0
    return Math.round((stats.value.wins / stats.value.totalGames) * 100)
  })

  const hasScores = computed(() => scores.value.length > 0)

  // Actions
  const addScore = async (scoreData) => {
    try {
      isLoading.value = true
      error.value = null

      const { db } = useFirebase()
      const scoresCollection = collection(db, 'scores')
      
      const newScore = {
        ...scoreData,
        timestamp: new Date(),
        createdAt: new Date().toISOString()
      }

      const docRef = await addDoc(scoresCollection, newScore)
      
      // Add to local state with the new ID
      scores.value.push({
        id: docRef.id,
        ...newScore
      })

      // Update stats
      updateStats()
      
      return docRef.id
    } catch (err) {
      error.value = err.message
      console.error('Error adding score:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const fetchScores = async () => {
    try {
      isLoading.value = true
      error.value = null

      const { db } = useFirebase()
      const scoresCollection = collection(db, 'scores')
      const scoresQuery = query(
        scoresCollection, 
        orderBy('timestamp', 'desc'),
        limit(100)
      )
      
      const querySnapshot = await getDocs(scoresQuery)
      const fetchedScores = []
      
      querySnapshot.forEach((doc) => {
        fetchedScores.push({
          id: doc.id,
          ...doc.data()
        })
      })

      scores.value = fetchedScores
      updateStats()
      
    } catch (err) {
      error.value = err.message
      console.error('Error fetching scores:', err)
    } finally {
      isLoading.value = false
    }
  }

  const updateStats = () => {
    if (scores.value.length === 0) {
      stats.value = {
        totalGames: 0,
        wins: 0,
        losses: 0,
        averageTime: 0,
        averageAttempts: 0
      }
      return
    }

    const totalGames = scores.value.length
    const wins = scores.value.filter(score => score.isWin).length
    const losses = totalGames - wins

    const totalTime = scores.value.reduce((sum, score) => sum + (score.timeSpent || 0), 0)
    const totalAttempts = scores.value.reduce((sum, score) => sum + (score.attemptsUsed || 0), 0)

    stats.value = {
      totalGames,
      wins,
      losses,
      averageTime: totalGames > 0 ? Math.round(totalTime / totalGames) : 0,
      averageAttempts: totalGames > 0 ? Math.round((totalAttempts / totalGames) * 10) / 10 : 0
    }
  }

  const clearScores = () => {
    scores.value = []
    updateStats()
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State (readonly for external access)
    scores: readonly(scores),
    isLoading: readonly(isLoading),
    error: readonly(error),
    stats: readonly(stats),
    
    // Getters
    topScores,
    winRate,
    hasScores,
    
    // Actions
    addScore,
    fetchScores,
    updateStats,
    clearScores,
    clearError
  }
})