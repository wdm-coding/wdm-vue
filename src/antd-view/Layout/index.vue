<script setup lang="ts">
// https://www.antdv.com/docs/vue/introduce-cn
  // import 'ant-design-vue/dist/reset.css';
  defineOptions({
    name: 'AntdLayout'
  })
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { theme } from 'ant-design-vue'
  import type { ConfigProviderProps } from 'ant-design-vue'
  const antdConfig:ConfigProviderProps = {
    locale: zhCN,
    theme: {
      algorithm: theme.darkAlgorithm, // 暗黑模式
      token: {
        colorPrimary: '#00b96b'
      },
      components: {
        Card: {
          borderRadiusLG: 0,
          paddingLG: 0
        }
      }
    }
  }
</script>


<template>
  <a-config-provider v-bind="antdConfig">
    <router-view />
  </a-config-provider>
</template>


<style lang='scss' scoped>

</style>
