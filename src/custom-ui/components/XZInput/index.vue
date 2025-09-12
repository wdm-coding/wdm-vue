<script setup lang='ts'>
  import './style.scss'
  import type { InputProps,InputEmits } from './types'
  import XZIcon from '@/custom-ui/components/XZIcon/index.vue'
  const innerValue = defineModel<string>('value')
  const props = withDefaults(defineProps<InputProps>(), {
    type: 'text',
    size: 'default',
    disabled: false,
    clearable: false,
    autocomplete: 'off',
    autofocus: false
  })
  const emit = defineEmits<InputEmits>()
  const isFocus = ref(false)
  const showClear = computed(() => !props.disabled && props.clearable && !!innerValue.value && isFocus.value)
  const handlerInput = (e: Event) => {
    emit('input', (e.target as HTMLInputElement).value)
  }
  const handleFocus = (e: Event) => {
    emit('focus', (e.target as HTMLInputElement).value)
    isFocus.value = true
  }
  const handleBlur = (e: Event) => {
    emit('blur', (e.target as HTMLInputElement).value)
    isFocus.value = false
  }
  const textAreaHandleBlur = (e: Event) => {
    emit('blur', (e.target as HTMLInputElement).value)
  }
  const textAreaHandleFocus = (e: Event) => {
    emit('focus', (e.target as HTMLInputElement).value)
  }
  const handlerChange = (e: Event) => {
    emit('change', (e.target as HTMLInputElement).value)
  }
  const clearHandle = () => {
    innerValue.value = ''
    emit('clear')
    emit('input', '')
    emit('change', '')
  }
  const passwordVisible = ref(false)
  const showpasswordArea = computed(() => {
    return !props.disabled &&
      props.showPassword &&
      (props.type === 'password' || props.type === 'text') &&
      !!innerValue.value 
  })
  const inputRef = useTemplateRef<HTMLInputElement | HTMLTextAreaElement>('inputRef')
  const togglePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
    keepFocus()
  }
  const keepFocus = () => {
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
  const attrs = useAttrs()
  defineOptions({
    name: 'XZInput',
    inheritAttrs: false
  })
  defineExpose({
    ref: inputRef
  })
</script>


<template>
  <div
    class='xz-input'
    :class="{
      [`xz-input--${type}`]: type,
      [`xz-input--${size}`]: size,
      'is-disabled': disabled,
      'is-clearable': clearable,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix
    }"
  >
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <span v-if="$slots.prepend" class="xz-input__prepend">
        <slot name='prepend' />
      </span>
      <div class="xz-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="xz-input__prefix">
          <slot name='prefix' />
        </span>
        <span v-if="prefixIcon">
          <XZIcon :icon="prefixIcon" color="#999" />
        </span>
        <input
          ref="inputRef"
          class="xz-input__inner"
          v-model="innerValue"
          :type="showPassword ? (passwordVisible?'text':'password') : type"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :autofocus="autofocus"
          :autocomplete="autocomplete"
          :form="form"
          v-bind="attrs"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handlerInput"
          @change="handlerChange"
        >
        <!-- suffix slot -->
        <span v-if="suffixIcon">
          <XZIcon :icon="suffixIcon" color="#999" />
        </span>
        <span v-if="$slots.suffix || showClear || showpasswordArea" class="xz-input__suffix">
          <slot name='suffix' />
          <XZIcon
            v-if="showClear"
            class="xz-input__clear"
            icon="circle-xmark"
            color="#999"
            @mousedown="clearHandle"
          />
          <XZIcon
            v-if="showpasswordArea"
            class="xz-input__show-password"
            :icon="passwordVisible ? 'eye' :'eye-slash'"
            color="#999"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <span v-if="$slots.append" class="xz-input__append">
        <slot name='append' />
      </span>
    </template>
    <template v-else>
      <textarea
        ref="inputRef"
        class="xz-textarea__wrapper"
        :disabled="disabled"
        v-model="innerValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :autofocus="autofocus"
        :autocomplete="autocomplete"
        :form="form"
        v-bind="attrs"
        @input="handlerInput"
        @change="handlerChange"
        @focus="textAreaHandleFocus"
        @blur="textAreaHandleBlur"
      />
    </template>
  </div>
</template>
