export const shuffle = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const shuffleCutCode = (code, length) =>
  shuffle(code).slice(0, length)

// Game utility functions
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const validateUserCode = (userCode) => {
  // Check if all digits are unique
  const digits = userCode.map(item => item.value)
  const uniqueDigits = [...new Set(digits)]
  return uniqueDigits.length === digits.length
}

export const generateRandomCode = (length = 4) => {
  return shuffleCutCode([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], length)
}

// Debounce utility
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}