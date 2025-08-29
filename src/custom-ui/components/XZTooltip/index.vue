<script setup lang="ts">
  import './style.scss'
  import XZButton from '../XZButton/index.vue'
  import { createPopper } from '@popperjs/core/lib/popper-lite.js'
  const button = useTemplateRef<HTMLButtonElement>('button')
  const tooltip = useTemplateRef<HTMLDivElement>('tooltip')
  onMounted(() => {
    if(button.value && tooltip.value) {
      const ins = createPopper(button.value, tooltip.value, {
        placement: 'right'
      })
      setTimeout(() => {
        ins.setOptions({
          placement: 'bottom'
        })
      }, 1500)
    }
  })
  defineOptions({
    name: 'XZTooltip'
  })
</script>

<!-- 8.3 -->
<template>
  <button ref="button">点击</button>
  <div ref="tooltip">My tooltip</div>
</template>


<style lang='scss' scoped>
</style>
