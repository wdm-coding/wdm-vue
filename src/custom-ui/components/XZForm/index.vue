<script setup lang='ts'>
  import './styles.scss'
  import type { ValidateFieldsError } from 'async-validator'
  import {
    formContextKey, 
    type FormContext,
    type FormItemContext,
    type FormProps,
    type FormInstance,
    type FormValidateFailure
  } from './types'
  const { model,rules } = defineProps<FormProps>()
  const fields:FormItemContext[] = reactive([])
  const addField:FormContext['addField'] = (field:FormItemContext) => {
    if(field.prop) {
      fields.push(field)
    }
  }
  const removeField:FormContext['removeField'] = (field:FormItemContext) => {
    if(!field.prop) return
    const index = fields.indexOf(field)
    if (index !== -1) {
      fields.splice(index, 1)
    }
  }

  const validate = async () => {
    let validationErrors:ValidateFieldsError = {}
    for (const field of fields) {
      try {
        await field.validate?.()
      } catch (e) {
        const error = e as FormValidateFailure
        validationErrors = {
          ...validationErrors,
          ...error.fields
        }
      }
    }
    if (Object.keys(validationErrors).length === 0) return Promise.resolve(model)
    return Promise.reject(validationErrors)
  }
  const clearValidate = () => {
    for (const field of fields) {
      field.clearValidate?.()
    }
  }
  const resetFields = (key?: string | string[]) => {
    if (!key) {
      fields.forEach(field => field.resetField?.())
      return
    }
    const keys = Array.isArray(key) ? key : [key]
    fields.forEach(field => {
      if (keys.includes(field.prop as string)) {
        field.resetField?.()
      }
    })
  }
  provide(formContextKey, {
    model,
    rules,
    addField,
    removeField 
  })
  defineExpose<FormInstance>({
    validate,
    clearValidate,
    resetFields
  })
  defineOptions({
    name: 'XZForm'
  })
</script>


<template>
  <div class='xz-form'>
    <slot />
  </div>
</template>
