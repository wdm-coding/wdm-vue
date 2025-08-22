<script setup>
  import vueThree from './components/vue-three.vue'
  import SuspenseTest from './components/suspense-test.vue'
  import useMousePosition from './hooks/useMousePosition'
  import modelVue from './components/model-vue.vue'
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
  const time = ref(3)
  onMounted(() => {
    const timer = setInterval(() => {
      time.value--
      if (time.value === 0) {
        clearInterval(timer)
      }
    }, 1000)
  })

  const { x, y } = useMousePosition()
  const modelValue = ref('123')
  watchEffect(() => {
    console.log('watchEffect', modelValue.value)
  })
</script>


<template>
  <div class='n_test_wrap'>
    <n-button @click="changeName">修改name</n-button>
    <vueThree
      v-if="isShow"
      v-bind="state"
    />
    <Suspense>
      <SuspenseTest text="cccc-yyyy" />
      <template #fallback>等待 {{ time }} 秒后渲染异步组件</template>
    </Suspense>
    <div>X:{{ x }}</div>
    <div>Y:{{ y }}</div>
    <div>modelValue:{{ modelValue }}</div>
    <!-- <modelVue :value="modelValue" @update:value="modelValue = $event" /> -->
    <modelVue v-model:value="modelValue" />
  </div>
</template>


<style lang='scss' scoped>
</style>
