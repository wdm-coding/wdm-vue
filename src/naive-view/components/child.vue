<script setup lang="ts">
  defineOptions({
    name: 'ChildComp'
  })
  const value = defineModel<string>()
</script>


<template>
  <n-input v-model:value="value" type="text" placeholder="基本的 Input" />
</template>


<style lang='scss' scoped>

</style>
