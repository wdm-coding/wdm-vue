<script setup lang='ts'>
  import './styles.scss'
  import type {
    SwitchEmits, SwitchProps,SwitchValueType 
  } from './types'
  const emit = defineEmits<SwitchEmits>()
  const props = withDefaults(defineProps<SwitchProps>(), {
    disabled: false,
    activeText: '',
    inactiveText: '',
    activeValue: true,
    inactiveValue: false
  })
  const innerValue = defineModel<SwitchValueType>('value', { default: false })
  const checked = computed(() => innerValue.value === props.activeValue)
  const swichValue = () => {
    if (props.disabled) return
    const newValue = checked.value ? props.inactiveValue : props.activeValue
    innerValue.value = newValue
    emit('change', checked.value)
  }
  defineOptions({
    name: 'XZSwitch',
    inheritAttrs: false
  })
</script>


<template>
  <div
    class='xz-switch'
    :class="{
      [`xz-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="swichValue"
  >
    <input
      v-model="checked"
      class="xz-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="swichValue"
    >
    <div
      class="xz-switch__core"
      :style="activeColor || inactiveColor ? {
        backgroundColor: checked ? activeColor : inactiveColor,
        borderColor: checked ? activeColor : inactiveColor,
      } : null"
    >
      <div class="xz-switch__core-inner">
        <span v-if="activeText || inactiveText" class="xz-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="xz-switch__core-action" />
    </div>
  </div>
</template>
