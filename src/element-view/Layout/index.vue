<script setup lang="ts">
  defineOptions({
    name: 'ElementLayout'
  })
  import 'element-plus/theme-chalk/dark/css-vars.css'
  import type { ConfigProviderProps } from 'element-plus'
  import zhCn from 'element-plus/es/locale/lang/zh-cn'
  import 'dayjs/locale/zh-cn'
  const elementConfig:Partial<ConfigProviderProps> = {
    size: 'default',
    zIndex: 3000,
    locale: zhCn
  }
  // 设置暗黑模式
  document.documentElement.classList.add('dark')
  onUnmounted(() => {
    document.documentElement.classList.remove('dark')
  })
</script>


<template>
  <el-config-provider v-bind="elementConfig">
    <router-view />
  </el-config-provider>
</template>


<style lang='scss' scoped>

</style>
