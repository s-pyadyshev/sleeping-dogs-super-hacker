import { defineStore } from 'pinia'
import { ref, readonly } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // State
  const isMenuOpen = ref(false)
  const currentPage = ref('instructions')
  const isFormSubmitted = ref(false)
  const notifications = ref([])
  const isLoading = ref(false)
  const theme = ref('default')

  // Actions
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const openMenu = () => {
    isMenuOpen.value = true
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  const setCurrentPage = (page) => {
    currentPage.value = page
    closeMenu() // Close menu when navigating
  }

  const setFormSubmitted = (submitted) => {
    isFormSubmitted.value = submitted
  }

  const addNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    }
    
    notifications.value.push(newNotification)
    
    // Auto-remove notification after duration
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }

  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
    // You could persist this to localStorage here
    if (process.client) {
      localStorage.setItem('sleeping-dogs-theme', newTheme)
    }
  }

  const initializeTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('sleeping-dogs-theme')
      if (savedTheme) {
        theme.value = savedTheme
      }
    }
  }

  // Success/Error notification helpers
  const showSuccess = (message, options = {}) => {
    return addNotification({
      type: 'success',
      message,
      ...options
    })
  }

  const showError = (message, options = {}) => {
    return addNotification({
      type: 'error',
      message,
      duration: 8000, // Errors stay longer
      ...options
    })
  }

  const showInfo = (message, options = {}) => {
    return addNotification({
      type: 'info',
      message,
      ...options
    })
  }

  const showWarning = (message, options = {}) => {
    return addNotification({
      type: 'warning',
      message,
      duration: 7000,
      ...options
    })
  }

  return {
    // State (readonly for external access)
    isMenuOpen: readonly(isMenuOpen),
    currentPage: readonly(currentPage),
    isFormSubmitted: readonly(isFormSubmitted),
    notifications: readonly(notifications),
    isLoading: readonly(isLoading),
    theme: readonly(theme),
    
    // Actions
    toggleMenu,
    openMenu,
    closeMenu,
    setCurrentPage,
    setFormSubmitted,
    addNotification,
    removeNotification,
    clearNotifications,
    setLoading,
    setTheme,
    initializeTheme,
    
    // Helper methods
    showSuccess,
    showError,
    showInfo,
    showWarning
  }
})