<script setup lang='ts'>
  import XZSelect from '@/custom-ui/components/XZSelect/index.vue'
  const options = ref([
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
    { value: '3', label: '选项三' },
    {
      value: '4', label: '选项四', disabled: true 
    }
  ])
  const selectValue = ref('2')
  defineOptions({
    name: 'SelectView'
  })
</script>


<template>
  <div class='select_view_wrap'>
    <XZSelect v-model:value="selectValue" :options="options" />
  </div>
</template>


<style lang='scss' scoped>
  .select_view_wrap{
    padding: 20px;
  }
</style>
