<script setup lang="ts">
  import createMessage,{ destoryAll } from '@/custom-ui/components/XZMessage/index'
  destoryAll()
  createMessage({
    message: '777', showClose: true, duration: 0, type: 'success' 
  })
  createMessage({
    message: '777', showClose: true, duration: 0, type: 'warning' 
  })
  createMessage({
    message: '777', showClose: true, duration: 0, type: 'danger' 
  })
  createMessage({
    message: '777', showClose: true, duration: 0, type: 'info' 
  })
  createMessage({
    message: '777', showClose: true, duration: 0, type: 'warning' 
  })
  createMessage({
    message: '777', showClose: true, duration: 0, type: 'danger' 
  })
  createMessage({
    message: '777', showClose: true, duration: 0, type: 'info' 
  })
  defineOptions({
    name: 'MessageView'
  })
</script>


<template>
  <div class='comName_wrap'>
    Message
  </div>
</template>


<style lang='scss' scoped>

</style>
