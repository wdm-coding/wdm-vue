<script setup lang="ts">
  defineOptions({
    name: 'AName'
  })
</script>


<template>
  <a-card class='a_home_wrap'>
    <a-button>Add</a-button>
    <a-button type="primary">Primary Button</a-button>
    <a-button type="dashed" danger>Dashed</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
    <a-button :loading="true">Loading</a-button>
    <a-button :loading="false">Loading</a-button>
    <a-card title="Default size card" style="width: 300px">
      <template #extra><a href="#">more</a></template>
      <p>card content</p>
      <p>card content</p>
      <p>card content</p>
    </a-card>
  </a-card>
</template>


<style lang='scss' scoped>
.a_home_wrap{
  width: 100%;
  height: 100%;
}
</style>
