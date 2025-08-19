<script setup lang="ts">
  import vueThree from './vue-three.vue'
  defineOptions({
    name: 'NTest'
  })
  const isShow = ref(true)
  const state = reactive({
    name: 'vue-three',
    age: 100
  })
  const changeName = () => {
    state.name = 'vue-three-change'
    state.age = 200
  }
  const obj = computed(() => ({
    name: state.name,
    age: state.age
  }))
  console.log('obj', obj.value)
</script>


<template>
  <div class='n_test_wrap'>
    <n-button @click="changeName">修改name</n-button>
    <vueThree
      v-if="isShow"
      v-bind="state"
    />
  </div>
</template>


<style lang='scss' scoped>
</style>
