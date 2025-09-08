<script setup lang="ts">
  import type { MessageProps } from './types'
  import RenderVnode from '@/custom-ui/utils/RenderVnode.ts'
  import XZIcon from '@/custom-ui/components/XZIcon/index.vue'
  withDefaults(defineProps<MessageProps>(),{
    type: 'info',
    duration: 3000,
    showClose: false,
    message: ''
  })

  defineOptions({
    name: 'XZMessage'
  })
  // 10  -- 00:18:40
</script>


<template>
  <div
    class='xz-message'
    :class="{
      [`xz-message--${type}`]: true,
      'is-closable': showClose,
    }"
    role="alert"
  >
    <div class="xz-message__content">
      <slot>
        <RenderVnode :v-node="message" />
      </slot>
    </div>
    <div class="xz-message__close" v-if="showClose">
      <XZIcon icon="xmark" />
    </div>
  </div>
</template>


<style lang='scss' scoped>

</style>
