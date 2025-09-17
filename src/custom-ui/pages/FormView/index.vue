<script setup lang='ts'>
  import XZForm from '@/custom-ui/components/XZForm/index.vue'
  import XZFormItem from '@/custom-ui/components/XZForm/xz-form-item.vue'
  import XZInput from '@/custom-ui/components/XZInput/index.vue'
  import XZSelect from '@/custom-ui/components/XZSelect/index.vue'
  import XZSwitch from '@/custom-ui/components/XZSwitch/index.vue'
  const model = reactive({
    name: '1',
    password: '2',
    switch: false
  })
  const rules = reactive({
    name: [{
      required: true, message: '请输入姓名', trigger: 'input' 
    }],
    password: [{
      required: true, message: '请输入密码', trigger: 'blur' 
    }]
  })
  defineOptions({
    name: 'FormView'
  })
</script>


<template>
  <div class='form_view_wrap'>
    <XZForm :model="model" :rules="rules">
      <XZFormItem label='姓名' prop='name'>
        <XZInput type='text' v-model:value='model.name' />
      </XZFormItem>
      <XZFormItem label='密码' prop='password'>
        <XZInput type='password' v-model:value='model.password' show-password />
      </XZFormItem>
      <XZFormItem label='开关' prop='switch'>
        <template #label="{label}">
          {{ label }}：{{ model.switch ? '开' : '关' }}
        </template>
        <XZSwitch v-model:value='model.switch' />
      </XZFormItem>
    </XZForm>
    <div>
      model:{{ JSON.stringify(model) }}
    </div>
  </div>
</template>


<style lang='scss' scoped>
  .form_view_wrap{
    padding: 20px;
  }
</style>
