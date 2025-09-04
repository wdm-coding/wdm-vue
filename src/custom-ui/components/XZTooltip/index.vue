<script setup lang="ts">
  import './style.scss'
  import { createPopper } from '@popperjs/core/lib/popper-lite.js'
  import type {
    TooltipEmits,TooltipProps,TooltipInstance 
  } from './types'
  import type { Instance } from '@popperjs/core/lib/popper-lite.js'
  import useClickOutside from '../hooks/useClickOutside'
  const { 
    content = '',
    placement = 'right',
    trigger = 'hover',
    manual = false,
    popperOptions,
    transtion = 'fade'
  } = defineProps<TooltipProps>()
  const popperOption = computed(() => {
    return {
      placement,
      ...popperOptions
    }
  })
  const emit = defineEmits<TooltipEmits>()
  // 触发节点和的ref引用
  const triggerNode = useTemplateRef<HTMLDivElement>('triggerNode')
  // popper节点的ref引用
  const popperNode = useTemplateRef<HTMLDivElement>('popperNode')
  // 定义visible双向绑定，用于控制tooltip的显示和隐藏状态
  const isVisible = defineModel<boolean>('visible',{ default: false })
  // 定义popperInstance，用于存储创建的Popper实例
  const popperInstance = shallowRef<Instance | null>(null)
  watch(isVisible, val => {
    if(val){
      // isVisible为true 创建popper实例
      if(triggerNode.value && popperNode.value) {
        popperInstance.value = createPopper(triggerNode.value, popperNode.value, popperOption.value)
      }
    }else{
      // isVisible为false 销毁popper实例
      if(popperInstance.value) {
        popperInstance.value.destroy()
      }
    }
  },{ flush: 'post' }) // flush: 'post' 表示在组件更新后执行，确保popperInstance已经定义
  // 定义动态绑定事件，用于在触发节点上监听点击/hover事件
  let events:Record<string,any> = reactive({})
  let outEvents:Record<string,any> = reactive({})
  // 监听trigger的变化，重新绑定事件
  watch(() => trigger,(newVal,oldVal) => {
    if(newVal !== oldVal){
      events = {}
      outEvents = {}
      attachEvents()
    }
  })
  // 控制tooltip的显示
  const open = () => {
    isVisible.value = true
    emit('change', isVisible.value)
  }
  // 控制tooltip的隐藏
  const close = () => {
    isVisible.value = false
    emit('change', isVisible.value)
  }
  // 定义togglePopper方法，用于切换tooltip的显示和隐藏状态
  const togglePopper = () => {
    isVisible.value = !isVisible.value
    emit('change', isVisible.value)
  }
  // 定义attachEvents方法，用于根据trigger的值绑定相应的事件
  const attachEvents = () => {
    if(trigger === 'hover'){
      events['mouseenter'] = open
      outEvents['mouseleave'] = close
    }else{
      events['click'] = togglePopper
    }
  }
  // 使用useClickOutside自定义hook，在点击外部区域时关闭tooltip
  const containerNode = useTemplateRef<HTMLDivElement>('containerNode')
  useClickOutside(containerNode, () => {
    trigger === 'click' && isVisible.value && !manual && close()
  })
  // 在非手动模式下，调用attachEvents方法绑定事件
  if(!manual){
    attachEvents()
  }
  // 监听manual的变化，重新绑定事件
  watch(() => manual,isManual => {
    if(isManual){
      events = {}
      outEvents = {}
    }else{
      attachEvents()
    }
  })
  defineOptions({
    name: 'XZTooltip'
  })
  defineExpose<TooltipInstance>({
    show: open,
    hide: close,
    toggle: togglePopper
  })

  onUnmounted(() => {
    if(popperInstance.value){
      popperInstance.value.destroy()
      popperInstance.value = null
    }
  })
</script>

<!-- 8.7 -->
<template>
  <div class="xz-tooltip" v-on="outEvents" ref="containerNode">
    <div
      class="xz-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
    >
      <slot />
    </div>
    <div
      class="xz-tooltip__popper"
      ref="popperNode"
      v-if="isVisible"
    >
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>