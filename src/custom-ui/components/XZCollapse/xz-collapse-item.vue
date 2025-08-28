<script setup lang="ts">
  import XZIcon from '../XZIcon/index.vue'
  import{ type CollapseItemProps } from './types.ts'
  import { collapseContextKey } from './types'
  const {
    name,
    title,
    disabled = false
  } = defineProps<CollapseItemProps>()
  // 注入折叠面板父组件的上下文信息。
  const collapseContext = inject(collapseContextKey)
  // 计算当前折叠项是否处于激活状态
  const isActive = computed(() => collapseContext?.activeNames.value.includes(name))
  // 处理折叠项头部点击事件
  const handleClick = () => {
    if (disabled) return
    collapseContext?.handleItemClick(name)
  }
  onMounted(() => {
    if (!collapseContext) {
      console.error('XZCollapseItem 组件必须作为 XZCollapse 组件的子组件使用。')
    }
  })
  // 动画钩子函数
  const transitionEvent:Record<string,(el:HTMLElement)=>void> = {
    beforeEnter: el => {
      el.style.height = '0px'
      el.style.overflow = 'hidden'
    },
    enter: el => {
      el.style.height = el.scrollHeight + 'px'
    },
    afterEnter: el => {
      el.style.height = ''
      el.style.overflow = ''
    },
    beforeLeave: el => {
      el.style.height = el.scrollHeight + 'px'
      el.style.overflow = 'hidden'
    },
    leave: el => {
      el.style.height = '0px'
    },
    afterLeave: el => {
      el.style.height = ''
      el.style.overflow = ''
    }
    
  }
  defineOptions({ name: 'XZCollapseItem' })
</script>


<template>
  <div class='xz-collapse-item' :class="{ 'is-disabled': disabled }">
    <div
      class="xz-collapse-item__header"
      :class="{ 
        'is-disabled': disabled,
        'is-active': isActive
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <XZIcon icon="chevron-down" class="header-chevron-icon" />
    </div>
    <Transition name="slide-fade" v-on="transitionEvent">
      <div v-show="isActive" class="xz-collapse-item__wrapper">
        <div class="xz-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>
