import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { equals } from 'ramda'
import { shuffleCutCode, ALLOWED_DIGITS } from '~/utils'

export const useGameStore = defineStore('game', () => {
  // State (reactive refs)
  const code = ref([])
  const userCode = ref([
    { value: 0, isExist: false, isValid: false },
    { value: 0, isExist: false, isValid: false },
    { value: 0, isExist: false, isValid: false },
    { value: 0, isExist: false, isValid: false }
  ])
  const attempts = ref(6)
  const attemptsUsed = ref(0)
  const counter = ref(0)
  const isUnlocked = ref(false)
  const isGameOver = ref(false)
  const isGameStarted = ref(false)
  const activeDigitId = ref(0)

  // Getters (computed)
  const currentUserCode = computed(() => 
    userCode.value.map(item => item.value)
  )

  const isGameInProgress = computed(() => 
    isGameStarted.value && !isUnlocked.value && !isGameOver.value
  )

  const gameStatus = computed(() => {
    if (isUnlocked.value) return 'won'
    if (isGameOver.value) return 'lost'
    if (isGameStarted.value) return 'playing'
    return 'idle'
  })

  // Actions
  const generateSecretCode = () => {
    code.value = shuffleCutCode(ALLOWED_DIGITS, 4)
    console.log('Secret code generated:', code.value) // For debugging
  }

  const decreaseAttempts = () => {
    if (attempts.value > 0) {
      attempts.value--
    }
  }

  const calculateAttemptsUsed = () => {
    attemptsUsed.value = 6 - attempts.value
  }

  const incrementDigit = (index) => {
    if (!isGameInProgress.value) return
    
    const currentValue = userCode.value[index].value
    userCode.value[index].value = currentValue === 9 ? 0 : currentValue + 1
    
    // Reset validation states when digit changes
    userCode.value[index].isExist = false
    userCode.value[index].isValid = false
  }

  const decrementDigit = (index) => {
    if (!isGameInProgress.value) return
    
    const currentValue = userCode.value[index].value
    userCode.value[index].value = currentValue === 0 ? 9 : currentValue - 1
    
    // Reset validation states when digit changes
    userCode.value[index].isExist = false
    userCode.value[index].isValid = false
  }

  const setActiveDigit = (index) => {
    if (index >= 0 && index < 4) {
      activeDigitId.value = index
    }
  }

  const moveActiveDigitLeft = () => {
    activeDigitId.value = activeDigitId.value === 0 ? 3 : activeDigitId.value - 1
  }

  const moveActiveDigitRight = () => {
    activeDigitId.value = activeDigitId.value === 3 ? 0 : activeDigitId.value + 1
  }

  const checkCodeValidity = () => {
    if (!isGameInProgress.value) return

    const userCodeArray = currentUserCode.value
    const isEqualCodes = equals(code.value, userCodeArray)
    
    if (isEqualCodes) {
      setGameUnlocked()
      return true
    }

    // Check each digit for validity and existence
    userCode.value.forEach((digit, index) => {
      const isUserValueExist = code.value.includes(digit.value)
      const isUserValueValid = code.value[index] === digit.value

      if (isUserValueExist && isUserValueValid) {
        digit.isExist = true
        digit.isValid = true
      } else if (isUserValueExist && !isUserValueValid) {
        digit.isExist = true
        digit.isValid = false
      } else {
        digit.isExist = false
        digit.isValid = false
      }
    })

    return false
  }

  const setGameUnlocked = () => {
    isGameStarted.value = false
    isUnlocked.value = true
    
    // Mark all digits as valid when game is won
    userCode.value.forEach(digit => {
      digit.isExist = true
      digit.isValid = true
    })
  }

  const setGameOver = () => {
    isGameStarted.value = false
    isGameOver.value = true
    resetUserCode()
  }

  const gameStart = () => {
    generateSecretCode()
    isGameOver.value = false
    isUnlocked.value = false
    isGameStarted.value = true
    attempts.value = 6
    attemptsUsed.value = 0
    counter.value = 0
    activeDigitId.value = 0
    resetUserCode()
  }

  const gameRestart = () => {
    gameStart()
  }

  const resetUserCode = () => {
    userCode.value = [
      { value: 0, isExist: false, isValid: false },
      { value: 0, isExist: false, isValid: false },
      { value: 0, isExist: false, isValid: false },
      { value: 0, isExist: false, isValid: false }
    ]
  }

  const resetGame = () => {
    code.value = []
    attempts.value = 6
    attemptsUsed.value = 0
    counter.value = 0
    isUnlocked.value = false
    isGameOver.value = false
    isGameStarted.value = false
    activeDigitId.value = 0
    resetUserCode()
  }

  const submitGuess = () => {
    if (!isGameInProgress.value) return

    decreaseAttempts()
    calculateAttemptsUsed()
    
    const isCorrect = checkCodeValidity()
    
    if (!isCorrect && attempts.value === 0) {
      setGameOver()
    }
  }

  return {
    // State (readonly for external access)
    code: readonly(code),
    userCode,
    attempts: readonly(attempts),
    attemptsUsed: readonly(attemptsUsed),
    counter,
    isUnlocked: readonly(isUnlocked),
    isGameOver: readonly(isGameOver),
    isGameStarted: readonly(isGameStarted),
    activeDigitId: readonly(activeDigitId),
    
    // Getters
    currentUserCode,
    isGameInProgress,
    gameStatus,
    
    // Actions
    generateSecretCode,
    decreaseAttempts,
    calculateAttemptsUsed,
    incrementDigit,
    decrementDigit,
    setActiveDigit,
    moveActiveDigitLeft,
    moveActiveDigitRight,
    checkCodeValidity,
    setGameUnlocked,
    setGameOver,
    gameStart,
    gameRestart,
    resetUserCode,
    resetGame,
    submitGuess
  }
})