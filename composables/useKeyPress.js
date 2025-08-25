export const useKeyPress = (targetKeys, callback) => {
  const keyPressed = ref(false)

  const downHandler = (event) => {
    if (targetKeys.includes(event.code) || targetKeys.includes(event.key)) {
      event.preventDefault() // Prevent default browser behavior
      keyPressed.value = true
      callback()
    }
  }

  const upHandler = (event) => {
    if (targetKeys.includes(event.code) || targetKeys.includes(event.key)) {
      keyPressed.value = false
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', downHandler)
    window.removeEventListener('keyup', upHandler)
  })

  return keyPressed