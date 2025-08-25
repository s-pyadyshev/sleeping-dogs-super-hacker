import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const counter = ref(0)
  const counterInProgress = ref(false)
  const startTime = ref(null)
  
  // Private variables for interval management
  let counterInterval = null

  // Actions
  const startCounter = () => {
    if (counterInProgress.value) return
    
    counter.value = 0
    counterInProgress.value = true
    startTime.value = Date.now()
    
    counterInterval = setInterval(() => {
      counter.value++
    }, 1000)
  }

  const pauseCounter = () => {
    if (counterInterval) {
      clearInterval(counterInterval)
      counterInterval = null
    }
    counterInProgress.value = false
  }

  const resumeCounter = () => {
    if (!counterInProgress.value && counter.value > 0) {
      counterInProgress.value = true
      counterInterval = setInterval(() => {
        counter.value++
      }, 1000)
    }
  }

  const stopCounter = () => {
    if (counterInterval) {
      clearInterval(counterInterval)
      counterInterval = null
    }
    counterInProgress.value = false
  }

  const resetCounter = () => {
    stopCounter()
    counter.value = 0
    startTime.value = null
  }

  const getFormattedTime = () => {
    const minutes = Math.floor(counter.value / 60)
    const seconds = counter.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const getTimeInSeconds = () => {
    return counter.value
  }

  // Cleanup function to be called when store is no longer needed
  const cleanup = () => {
    if (counterInterval) {
      clearInterval(counterInterval)
      counterInterval = null
    }
  }

  return {
    // State (readonly for external access)
    counter: readonly(counter),
    counterInProgress: readonly(counterInProgress),
    startTime: readonly(startTime),
    
    // Actions
    startCounter,
    pauseCounter,
    resumeCounter,
    stopCounter,
    resetCounter,
    getFormattedTime,
    getTimeInSeconds,
    cleanup
  }
})