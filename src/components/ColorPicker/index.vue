<script setup lang="ts">
  defineOptions({
    name: 'ColorPicker'
  })
  import { ColorPicker as VColorPicker } from 'vue3-colorpicker'
  import 'vue3-colorpicker/style.css'
  const value = defineModel<string>('value', {
    default: '#ffffff'
  })
  const pureColor = ref<string>(value.value)
  watch(value, newValue => {
    pureColor.value = newValue
  })
  const attr = useAttrs()
  console.log(attr)
</script>


<template>
  <a-input-group compact>
    <a-input
      v-model:value="value"
      style="width: calc(100% - 40px)"
      :placeholder="($attrs.placeholder as string)"
    />
    <VColorPicker
      v-model:pureColor="pureColor"
      format="hex"
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
