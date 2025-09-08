<script setup lang="ts">
  import './style.scss'
  import { createPopper } from '@popperjs/core/lib/index.js'
  import type {
    TooltipEmits,TooltipProps,TooltipInstance 
  } from './types'
  import type { Instance } from '@popperjs/core/lib/index.js'
  import useClickOutside from '../hooks/useClickOutside'
  const { 
    content = '',
    placement = 'right',
    trigger = 'hover',
    manual = false,
    popperOptions,
    transtion = 'fade',
    delay = 0,
    duration = 0,
    showArrow = true
  } = defineProps<TooltipProps>()
  const popperOption = computed(() => {
    return {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 0]
          }
        }
      ],
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
    if(val && triggerNode.value && popperNode.value){
      // isVisible为true 创建popper实例
      popperInstance.value = createPopper(triggerNode.value, popperNode.value, popperOption.value)
    }
  },{ flush: 'post' }) // flush: 'post' 表示在组件更新后执行，确保popperInstance已经定义
  // 动画钩子，用于在动画完成后销毁popper实例
  const afterLeave = () => {
    if(popperInstance.value) {
      popperInstance.value.destroy()
    }
  }
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
  const openTimer:any = ref(null)
  const closeTimer:any = ref(null)
  const open = () => {
    closeTimer.value && clearTimeout(closeTimer.value)
    openTimer.value && clearTimeout(openTimer.value)
    openTimer.value = setTimeout(() => {
      isVisible.value = true
      emit('change', isVisible.value)
    },delay)
  }
  // 控制tooltip的隐藏
  const close = () => {
    openTimer.value && clearTimeout(openTimer.value)
    closeTimer.value && clearTimeout(closeTimer.value)
    closeTimer.value = setTimeout(() => {
      isVisible.value = false
      emit('change', isVisible.value)
    },duration)
  }
  // 定义togglePopper方法，用于切换tooltip的显示和隐藏状态
  const togglePopper = () => {
    if(isVisible.value){
      close()
    }else{
      open()
    }
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
    closeTimer.value && clearTimeout(closeTimer.value)
    openTimer.value && clearTimeout(openTimer.value)
  })
</script>

<!-- 8.7 -->
<template>
  <div
    class="xz-tooltip"
    v-on="outEvents"
    ref="containerNode"
  >
    <div
      class="xz-tooltip__trigger"
      ref="triggerNode"
      v-on="events"
    >
      <slot />
    </div>
    <Transition :name="transtion" @after-leave="afterLeave">
      <div
        class="xz-tooltip__popper"
        ref="popperNode"
        v-if="isVisible"
      >
        <slot name="content">{{ content }}</slot>
        <div id="arrow" data-popper-arrow v-if="showArrow" />
      </div>
    </Transition>
  </div>
</template>