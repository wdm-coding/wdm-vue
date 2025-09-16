<script setup lang='ts'>
  import XZForm from '@/custom-ui/components/XZForm/index.vue'
  defineOptions({
    name: 'FormView'
  })
</script>


<template>
  <div class='form_view_wrap'>
    <XZForm />
    <!--10 -- 43 -->
  </div>
</template>


<style lang='scss' scoped>
  .form_view_wrap{
    padding: 20px;
  }
</style>
