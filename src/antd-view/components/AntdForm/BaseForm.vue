<script setup lang="ts">
  import type { FormInstance } from 'ant-design-vue'
  defineOptions({
    name: 'BaseForm'
  })
  interface BaseFormColumn {
    label: string
    name: string
    rules?: Array<object>
    type?: string
  }
  interface BaseFormModel {
    columns: Array<BaseFormColumn>
  }
  // 定义组件的props和其他逻辑
  const props = withDefaults(defineProps<BaseFormModel>(), {
    
  })
  // 定义组件的状态和方法
  const items = computed(() => props.columns)
  // 定义组件实例
  const formRef = defineModel<FormInstance | null>('formRef', { default: null })
  // 定义表单数据
  const formState = defineModel<Record<string, any>>('formState', { default: () => ({}) })
</script>


<template>
  <a-form :model="formState" ref="formRef" v-bind="$attrs">
    <AntdFormItem
      v-for="item in items"
      :key="item.name"
      v-bind="item"
      v-model="formState[item.name]"
    />
  </a-form>
</template>


<style lang='scss' scoped>

</style>
