<script>
  import vueJsx from './components/vue-jsx.jsx'
  export default defineComponent (
    // 第一个参数是setup函数，第二个参数是组件选项对象
    () => {
      const count = ref(0)
      return { count }
    },
    { 
      name: 'nTest',
      components: {
        vueJsx
      },
      mounted(){
        console.log('idnex-mounted')
      }
    }
  )
</script>


<template>
  <div class='n_test_wrap'>
    <p>index-{{ count }}</p>
    <vueJsx />
  </div>
</template>


<style lang='scss' scoped>
</style>
