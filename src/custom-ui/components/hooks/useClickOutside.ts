type ElementType = Ref<undefined | HTMLElement | null>;
export default function useClickOutside(el: ElementType, callback: (event: MouseEvent) => void) {
  const handleClickOutside = (event: MouseEvent) => {
    // el.value.contains(event.target as Node) 判断点击事件是否在el元素内部，如果在则不执行回调函数
    if(el.value && event.target && !el.value.contains(event.target as Node)){
      callback(event)
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
}