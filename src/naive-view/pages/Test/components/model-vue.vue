<script setup>
  const props = defineProps({
    value: String
  })
  const emit = defineEmits(['update:value'])
  const initValue = computed({
    get(){
      return props.value
    },
    set(val){
      emit('update:value', val)
    }
  })
  const change = () => {
    initValue.value = `${Math.random()}`
  }
</script>


<template>
  <div class='comName_wrap'>
    <div>initValue:{{ initValue }}</div>
    <n-button type="primary" @click="change">修改initValue</n-button>
  </div>
</template>


<style lang='scss' scoped>

</style>
