<script setup>
  const props = defineProps(['name','age'])
  const { name,age } = toRefs(props)
  watchEffect(() => {
    console.log('watchEffect',name.value,age.value)
  })
  const changeData = () => {

  }
</script>


<template>
  <div class='vue_three_wrap'>
    <div>姓名：{{ name }}</div>
    <div>年龄：{{ age }}</div>
    <n-button type="primary" @click="changeData">修改数据</n-button>
  </div>
</template>


<style lang='scss' scoped>

</style>
