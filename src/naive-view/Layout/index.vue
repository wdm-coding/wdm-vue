<script setup lang="ts">
  defineOptions({
    name: 'NaiveLayout'
  })
  import {
    darkTheme, zhCN, dateZhCN ,type GlobalThemeOverrides  
  } from 'naive-ui'
  const naiveConfig = {
    locale: zhCN, // 中文语言包配置
    dateLocale: dateZhCN, // 中文日期语言包配置
    theme: null, // 暗黑主题配置darkTheme
    abstract: true // 不使用n-config-provider DOM 包裹
  }
  const themeOverrides: GlobalThemeOverrides = {
    common: {},
    Card: {
      borderRadius: '0px',
      paddingHuge: '0px',
      paddingLarge: '0px',
      paddingMedium: '0px',
      paddingSmall: '0px'
    }
  }
</script>


<template>
  <n-config-provider v-bind="{...naiveConfig,themeOverrides}">
    <n-card :bordered="false">
      <router-view />
    </n-card>
  </n-config-provider>
</template>


<style lang='scss' scoped>

</style>
