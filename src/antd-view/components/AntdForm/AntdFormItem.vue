<script setup lang="ts">
  defineOptions({
    name: 'AntdFormItem',
    inheritAttrs: false
  })
  interface FormItemModel {
    label?: string
    name?: string
    rules?: Array<object>
    type?: string
    itemAttrs?: Record<string, any>
    formItemAttrs?: Record<string, any>
    isHide?: boolean
  }
  const props = withDefaults(defineProps<FormItemModel>(), {
    isHide: false
  })
  const compMap: Record<string, any> = {
    'a-input': resolveComponent('a-input'),
    'a-textarea': resolveComponent('a-textarea'),
    'a-input-password': resolveComponent('a-input-password'),
    'a-input-number': resolveComponent('a-input-number'),
    'a-select': resolveComponent('a-select'),
    'a-radio-group': resolveComponent('a-radio-group'),
    'a-checkbox-group': resolveComponent('a-checkbox-group'),
    'a-cascader': resolveComponent('a-cascader'),
    'a-switch': resolveComponent('a-switch'),
    'a-date-picker': resolveComponent('a-date-picker'),
    'a-range-picker': resolveComponent('a-range-picker'),
    'a-rate': resolveComponent('a-rate'),
    'a-slider': resolveComponent('a-slider'),
    'ColorPicker': resolveComponent('ColorPicker')
  }
  const value = defineModel<string | number | boolean>()
  const typeName = computed(() => compMap[String(props.type) || 'a-input'])
  const valueProp = computed(() => props.type === 'a-switch' ? 'checked' : 'value')
  watchEffect(() => {
    if (props.type === 'ColorPicker') {
      console.log('value',value.value)
    }
  })
  
</script>


<template>
  <a-form-item
    :label="props.label"
    :name="props.name"
    :rules="props.rules"
    v-bind="props.formItemAttrs"
    v-if="props.name && !props.isHide"
  >
    <component
      v-model:[valueProp]="value"
      :is="typeName"
      v-bind="{...$attrs,...props.itemAttrs}"
    />
  </a-form-item>
</template>


<style lang='scss' scoped>

</style>
