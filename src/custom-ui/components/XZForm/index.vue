<script setup lang='ts'>
  import {
    formContextKey, type FormContext, type FormItemContext, type FormProps 
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
    console.log('fields',fields)
  }

  // 21:10








  provide(formContextKey, {
    model,rules,addField,removeField 
  })
  onMounted(() => {
    
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
