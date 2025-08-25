import { useGameStore } from '~/stores/game'
import { useCounterStore } from '~/stores/counter'
import { useScoreboardStore } from '~/stores/scoreboard'
import { useUIStore } from '~/stores/ui'

export const useGame = () => {
  const gameStore = useGameStore()
  const counterStore = useCounterStore()
  const scoreboardStore = useScoreboardStore()
  const uiStore = useUIStore()

  // Game control methods
  const startNewGame = () => {
    gameStore.gameStart()
    counterStore.startCounter()
    uiStore.setCurrentPage('game')
  }

  const restartGame = () => {
    gameStore.gameRestart()
    counterStore.resetCounter()
    counterStore.startCounter()
  }

  const endGame = (isWin = false) => {
    counterStore.stopCounter()
    
    if (isWin) {
      gameStore.setGameUnlocked()
      uiStore.showSuccess('Congratulations! You cracked the code!')
    } else {
      gameStore.setGameOver()
      uiStore.showError('Game Over! Better luck next time.')
    }
  }

  // Input handling methods
  const handleDigitIncrement = (index) => {
    gameStore.incrementDigit(index)
  }

  const handleDigitDecrement = (index) => {
    gameStore.decrementDigit(index)
  }

  const handleDigitNavigation = (direction) => {
    if (direction === 'left') {
      gameStore.moveActiveDigitLeft()
    } else if (direction === 'right') {
      gameStore.moveActiveDigitRight()
    }
  }

  const submitGuess = async () => {
    if (!gameStore.isGameInProgress) return

    gameStore.submitGuess()

    // Check game end conditions
    if (gameStore.isUnlocked) {
      endGame(true)
    } else if (gameStore.isGameOver) {
      endGame(false)
    }
  }

  // Score submission
  const submitScore = async (playerData) => {
    try {
      uiStore.setLoading(true)
      
      const scoreData = {
        name: playerData.name,
        luckyNumber: playerData.luckyNumber,
        comment: playerData.comment || '',
        timeSpent: counterStore.counter,
        attemptsUsed: gameStore.attemptsUsed,
        isWin: gameStore.isUnlocked,
        code: gameStore.code,
        userCode: gameStore.currentUserCode
      }

      await scoreboardStore.addScore(scoreData)
      uiStore.setFormSubmitted(true)
      uiStore.showSuccess('Score submitted successfully!')
      
    } catch (error) {
      uiStore.showError('Failed to submit score. Please try again.')
      console.error('Score submission error:', error)
    } finally {
      uiStore.setLoading(false)
    }
  }

  // Keyboard controls setup
  const setupKeyboardControls = () => {
    useKeyPress(['ArrowUp', 'KeyW'], () => {
      handleDigitIncrement(gameStore.activeDigitId)
    })

    useKeyPress(['ArrowDown', 'KeyS'], () => {
      handleDigitDecrement(gameStore.activeDigitId)
    })

    useKeyPress(['ArrowLeft', 'KeyA'], () => {
      handleDigitNavigation('left')
    })

    useKeyPress(['ArrowRight', 'KeyD'], () => {
      handleDigitNavigation('right')
    })

    useKeyPress(['Enter', 'Space'], () => {
      submitGuess()
    })

    useKeyPress(['Escape'], () => {
      if (gameStore.isGameStarted) {
        restartGame()
      }
    })
  }

  return {
    // Stores
    gameStore,
    counterStore,
    scoreboardStore,
    uiStore,
    
    // Methods
    startNewGame,
    restartGame,
    endGame,
    handleDigitIncrement,
    handleDigitDecrement,
    handleDigitNavigation,
    submitGuess,
    submitScore,
    setupKeyboardControls
  }
}