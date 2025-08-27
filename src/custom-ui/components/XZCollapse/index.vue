<script setup lang="ts">
  import './style.scss'
  import type {
    NameType, CollapseEmits,CollapseProps 
  } from './types'
  import { collapseContextKey } from './types'
  const { accordion = false } = defineProps<CollapseProps>()
  const emit = defineEmits<CollapseEmits>()
  // 定义一个响应式数组来存储当前激活的折叠项名称
  const activeNames = defineModel<NameType[]>('value',{ default: () => [] })
  if(accordion && activeNames.value.length > 1) {
    console.warn('accordion模式下,绑定的数组最多只能有一个值')
    activeNames.value = []
  }
  // 处理折叠项点击事件，切换折叠项的激活状态
  const handleItemClick = (name: NameType) => {
    if (accordion) {
      activeNames.value = [activeNames.value[0] === name ? '' : name]
      return
    }
    // 通过.value访问响应式数据
    const index = activeNames.value.indexOf(name)
    if (index > -1) {
      activeNames.value.splice(index, 1)
    } else {
      activeNames.value.push(name)
    }
    // 触发change事件
    emit('change', [...activeNames.value])
  }
  // 透传给子组件
  provide(collapseContextKey, {
    activeNames,
    handleItemClick
  })
  defineOptions({ name: 'XZCollapse' })
</script>

<template>
  <div class="xz-collapse">
    <slot />
  </div>
</template>