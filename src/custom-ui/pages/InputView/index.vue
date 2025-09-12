<script setup lang='ts'>
  import XZInput from '@/custom-ui/components/XZInput/index.vue'
  const modelValue = ref('')
  defineOptions({
    name: 'InputView'
  })
</script>


<template>
  <div class='input_view_wrap'>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">基础文本框</h2>
      <XZInput type="text" v-model:value="modelValue" placeholder="请输入" />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">复合型文本框</h2>
      <XZInput type="text" v-model:value="modelValue" placeholder="请输入">
        <template #prepend>前置内容</template>
        <template #append>后置内容</template>
        <template #suffix>后缀内容</template>
        <template #prefix>前缀内容</template>
      </XZInput>
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">清空文本框</h2>
      <XZInput
        type="text"
        v-model:value="modelValue"
        clearable
        placeholder="请输入"
      >
        <template #suffix>后缀内容</template>
      </XZInput>
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">密码文本框</h2>
      <XZInput
        type="password"
        v-model:value="modelValue"
        showPassword
        placeholder="请输入"
      />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">禁用文本框</h2>
      <XZInput
        type="text"
        v-model:value="modelValue"
        disabled
        placeholder="请输入"
      />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">只读文本框</h2>
      <XZInput
        type="text"
        v-model:value="modelValue"
        readonly
        placeholder="请输入"
      />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">前置、后缀icon</h2>
      <XZInput
        type="text"
        v-model:value="modelValue"
        prefix-icon="fan"
        suffix-icon="fan"
        placeholder="请输入"
      />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">文本域</h2>
      <XZInput type="textarea" v-model:value="modelValue" placeholder="请输入" />
    </div>
  </div>
</template>


<style lang='scss' scoped>
  .input_view_wrap{
    padding: 20px;
  }
</style>
