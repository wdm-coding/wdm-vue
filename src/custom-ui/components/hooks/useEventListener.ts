import type { ShallowRef } from 'vue'

export default function useEventListener(
  target: EventTarget | ShallowRef<EventTarget | null>,
  eventType: string,
  callback: (event: any) => any
): void {
  onMounted(() => {
    if(isRef(target)){
      watch(target, (value,oldValue) => {
        oldValue?.removeEventListener(eventType, callback)
        value?.addEventListener(eventType, callback)
      })
    }else{
      target.addEventListener(eventType, callback)
    }
  })
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(eventType, callback)
  })
}