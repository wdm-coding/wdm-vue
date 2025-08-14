<script setup lang="ts">
  defineOptions({
    name: 'NTest'
  })
  const name = ref('xxx')
  const obj = reactive({
    name: 'xxx'
  })
  watch(
    () => name.value,
    (val,old) => {
      console.log('name change',val,old)
    },
    {
      deep: true
    }
  )
  watch(
    () => obj.name,
    (val,old) => {
      console.log('obj change',val,old)
    },
    {
      deep: true
    }
  )
  const isShow = ref(true)
  const changeName = (e:any,v:any) => {
    console.log('changeName', e)
    name.value = v
    obj.name = v
    isShow.value = !isShow.value
  }
</script>


<template>
  <div class='n_test_wrap'>
    <n-button @click="changeName($event,111)">修改name</n-button>
    <div v-if="isShow">v-if</div>
    <div v-show="isShow">v-show</div>
    <div :style="{visibility:isShow ? 'visible' : 'hidden'}">visibility</div>
  </div>
</template>


<style lang='scss' scoped>
</style>
