const zIndex = ref(0)
export default function useZIndex(init = 1000) {
  const initialValue = ref(init)
  const currentZIndex = computed(() => zIndex.value + initialValue.value)
  function nextZIndex() {
    zIndex.value += 1
    return currentZIndex.value
  }
  return {
    zIndex,
    nextZIndex,
    initialValue 
  }
}