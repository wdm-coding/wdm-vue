<script setup lang="ts">
  import { useTemplateRef } from 'vue'
  import './style.scss'
  import { type ButtonProps } from './types'
  import XZIcon from '../XZIcon/index.vue'
  defineOptions({
    name: 'XZButton'
  })
  const {
    type = 'primary',
    size = 'default',
    plain = false,
    round = false,
    disabled = false,
    circle = false,
    loading = false,
    autofocus = false,
    nativeType = 'button',
    icon
  } = defineProps<ButtonProps>()
  const buttonRef = useTemplateRef('button')

  // 暴露给父组件使用
  defineExpose({
    instance: buttonRef
  })
</script>


<template>
  <button
    ref="button"
    class='xz-button'
    :class="{
      [`xz-button--${type}`]: type,
      [`xz-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-disabled': disabled,
      'is-circle': circle,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <XZIcon v-if="loading" icon="spinner" spin />
    <XZIcon v-if="icon" :icon="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>
