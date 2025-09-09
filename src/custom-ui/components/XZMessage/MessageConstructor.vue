<script setup lang="ts">
  import './styles.scss'
  import type { MessageProps } from './types'
  import RenderVnode from '@/custom-ui/utils/RenderVnode.ts'
  import XZIcon from '@/custom-ui/components/XZIcon/index.vue'
  import { getLastBottomOffset } from './method.ts'
  import useEventListener from '../hooks/useEventListener'
  const props = withDefaults(defineProps<MessageProps>(),{
    type: 'info',
    duration: 3000,
    showClose: false,
    message: '',
    offset: 20,
    transitionName: 'fade-up'
  })
  const messageIcon = computed(() => {
    switch(props.type) {
      case 'info':
        return 'info-circle'
      case 'success':
        return 'check-circle'
      case 'warning':
        return 'warning'
      case 'danger':
        return 'circle-exclamation'
      default:
        return ''
    }
  })
  const visible = ref<boolean>(false)
  // 包裹元素的引用，用于获取包裹元素的DOM元素
  const messageRef = useTemplateRef<HTMLDivElement>('messageRef')
  // 上一个元素最下面的偏移量 第一个实例是 0
  const prevBottomOffset = computed(() => getLastBottomOffset(props.id))
  // 当前元素的距离顶部的距离
  const curtTopOffset = computed(() => prevBottomOffset.value + props.offset!)
  // 当前实例的高度值
  const curtHeight = ref<number>(0)
  // 当前元素底部距离顶部的偏移量
  const bottomOffset = computed(() => curtTopOffset.value + curtHeight.value)
  // 计算样式
  const cssStyle = computed(() => ({ 
    top: `${curtTopOffset.value}px`,
    zIndex: props.zIndex
  }))
  const keydown = (e: KeyboardEvent) => {
    if(e.code === 'Escape'){
      visible.value = false
    }
  }
  useEventListener(document,'keydown',keydown)
  let timer = ref<NodeJS.Timeout | null>(null)
  const startTime = () => {
    if(props.duration === 0) return
    timer.value = setTimeout(() => {
      visible.value = false
    }, props.duration)
  }
  const clearTime = () => {
    timer.value && clearTimeout(timer.value)
  }
  onMounted(async () => {
    visible.value = true
    startTime()
  })
  const updateHeight = () => {
    curtHeight.value = messageRef.value!.getBoundingClientRect().height
  }
  const destoryComponent = () => {
    props.onDestory()
  }
  onUnmounted(() => {
    if(timer.value) clearTimeout(timer.value)
  })
  defineExpose({
    bottomOffset,
    visible
  })
  defineOptions({
    name: 'MessageConstructor'
  })
</script>


<template>
  <Transition :name="transitionName" @after-leave="destoryComponent" @enter="updateHeight">
    <div
      class='xz-message'
      :class="{
        [`xz-message--${type}`]: true,
        'is-close': showClose,
      }"
      :style="cssStyle"
      role="alert"
      ref="messageRef"
      v-show="visible"
      @mouseenter="clearTime()"
      @mouseleave="startTime()"
    >
      <div class="xz-message__icon">
        <XZIcon :icon="messageIcon" />
      </div>
      <div class="xz-message__content">
        <slot>
          <RenderVnode :v-node="message" />
        </slot>
      </div>
      <div class="xz-message__close" v-if="showClose">
        <XZIcon icon="xmark" @click.stop="visible = false" />
      </div>
    </div>
  </Transition>
</template>


<style lang='scss' scoped>

</style>
