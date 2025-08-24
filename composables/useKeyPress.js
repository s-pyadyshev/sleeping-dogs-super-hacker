export const useKeyPress = (targetKeys, callback) => {
  const keyPressed = ref(false)

  const downHandler = (event) => {
    const key = event.code || event.key
    if (targetKeys.includes(key)) {
      keyPressed.value = true
      callback()
    }
  }

  const upHandler = (event) => {
    const key = event.code || event.key
    if (targetKeys.includes(key)) {
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
}