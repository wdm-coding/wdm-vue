function useMousePosition(){
  const mousePosition = reactive({ x: 0, y: 0 })
  function updateMousePosition(e) {
    mousePosition.x = e.clientX
    mousePosition.y = e.clientY
  }
  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove',updateMousePosition)
  })

  return toRefs(mousePosition)
}

export default useMousePosition