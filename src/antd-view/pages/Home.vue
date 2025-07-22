<script setup lang="ts">
  defineOptions({
    name: 'AHome'
  })
  const columns = [
    {
      label: '姓名',
      name: 'name',
      rules: [{ required: true, message: '请输入姓名' }],
      type: 'a-input'
    },
    {
      label: '年龄',
      name: 'age',
      rules: [{ required: true, message: '请输入年龄' }],
      type: 'a-input-number'
    },
    {
      label: '性别',
      name: 'sex',
      placeholder: '请选择性别',
      rules: [{ required: true, message: '请选择性别' }],
      type: 'a-select',
      options: [
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      formItemAttrs: {
        colon: false,
        style: { width: '200px' }
      },
      itemAttrs: {
        allowClear: true
      },
      onChange: (value: any) => {
        console.log('性别选择1:', value)
        if(value === 1){
          // 更改isHide
          columns[3].isHide = false
          formState.name = '111'
        }else{
          columns[3].isHide = true
        }
      }
    },
    {
      label: '邮箱',
      name: 'email',
      placeholder: '请输入邮箱',
      rules: [{ required: true, message: '请输入邮箱' }],
      type: 'a-input',
      isHide: true
    },
    {
      label: '颜色',
      name: 'color',
      placeholder: '请选择颜色',
      type: 'ColorPicker',
      rules: [{ required: true, message: '请选择颜色' }]
    }
  ]
  const formRef = ref()
  const formState = reactive<Record<string, any>>({})
  const submitHandler = () => {
    formRef.value?.validate().then((value: any) => {
      console.log('校验成功:', value)
    }).catch((error: any) => {
      console.error('校验失败:', error)
    })
  }
  const resetHandler = () => {
    formRef.value?.resetFields()
  }
</script>


<template>
  <a-card class='a_home_wrap'>
    <BaseForm
      v-model:formRef="formRef"
      v-model:formState="formState"
      :columns="columns"
      layout="inline"
    />
    <a-button @click="submitHandler">校验表单</a-button>
    <a-button @click="resetHandler">重置表单</a-button>
  </a-card>
</template>


<style lang='scss' scoped>
.a_home_wrap{
  width: 100%;
  height: 100%;
}
</style>
