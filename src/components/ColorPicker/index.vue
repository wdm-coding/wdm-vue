<script setup lang="ts">
  defineOptions({
    name: 'ColorPicker'
  })
  import { ColorPicker as VColorPicker } from 'vue3-colorpicker'
  import 'vue3-colorpicker/style.css'
  const pureColor = defineModel<string>()
</script>


<template>
  <a-input-group compact>
    <a-input
      v-model:value="pureColor"
      style="width: calc(100% - 40px)"
      :placeholder="$attrs.placeholder"
    />
    <VColorPicker
      v-model:pureColor="pureColor"
      format="十六进制"
    />
  </a-input-group>
</template>


<style lang='scss' scoped>
::v-deep(.vc-color-wrap){
  width: 40px;
  height: 30px;
  margin: 0;
}
</style>
