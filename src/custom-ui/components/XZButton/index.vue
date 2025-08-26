<script setup lang="ts">
  import './style.scss'
  import { type ButtonProps } from '../types'
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
    nativeType = 'button'
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
    <span>
      <slot />
    </span>
  </button>
</template>
