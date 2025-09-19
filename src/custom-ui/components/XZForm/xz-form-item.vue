<script setup lang='ts'>
  import Schema from 'async-validator'
  import {
    formContextKey,
    formItemContextKey,
    type FormItemProps,
    type FormValidateFailure,
    type FormItemContext
  } from './types'
  const formContext = inject(formContextKey)
  const validateStatus = reactive({
    state: 'init',
    errorMsg: '',
    loading: false
  }) 
  const { label,prop } = defineProps<FormItemProps>()
  const innerValue = computed(() => formContext!.model[prop!])
  const rules = computed(() => formContext!.rules[prop!])
  const getTriggeredRules = (trigger?: string) => {
    if(!rules.value) return []
    if(!trigger) return rules.value
    return rules.value.filter(rule => {
      if(!rule.trigger) return true
      return rule.trigger && rule.trigger === trigger
    })
  }
  const validate = async (trigger?: string) => {
    if(!prop || !rules.value) return true
    const triggeredRules = getTriggeredRules(trigger)
    if(triggeredRules.length === 0) return true
    const validator = new Schema({
      [prop]: triggeredRules
    })
    validateStatus.loading = true
    return validator.validate({ [prop]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success'
      })
      .catch((err:FormValidateFailure) => {
        const  { errors } = err
        if(errors){
          validateStatus.state = 'error'
          validateStatus.errorMsg = errors[0].message! || ''
          return Promise.reject(trigger ? errors : err)
        }
      })
      .finally(() => {
        validateStatus.loading = false
      })
  }
  const clearValidate = () => {
    validateStatus.state = 'init'
    validateStatus.errorMsg = ''
    validateStatus.loading = false
  }
  let initialValue = ref(innerValue.value)
  const resetField = () => {
    formContext!.model[prop!] = initialValue.value
    clearValidate()
  }
  const context:FormItemContext = {
    prop: prop || '',
    validate,
    clearValidate,
    resetField
  }
  provide(formItemContextKey,context)

  onMounted(() => {
    initialValue.value = innerValue.value
    prop && formContext!.addField(context)
  })
  onBeforeMount(() => {
    prop && formContext!.removeField(context)
  })
  defineOptions({
    name: 'XZFormItem'
  })
</script>


<template>
  <div
    class='xz-form-item'
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading
    }"
  >
    <label class="xz-form-item__label">
      <slot name="label" :label="label">{{ label }}</slot>
    </label>
    <div class="xz-form-item__content">
      <slot :validate="validate" />
      <div class="xz-from-item__error-message" v-if="validateStatus.state === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
