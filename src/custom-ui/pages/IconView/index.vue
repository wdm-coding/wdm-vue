<script setup lang="ts">
  import child from './child.vue'
  const state = reactive({
    list: []
  })

  watchEffect(() => {
    console.log('state.list',state.list)
  })
  watch(() => state.list,newVal => {
    console.log('watch',newVal)
  },{ deep: true,immediate: true })
  defineOptions({
    name: 'IconView'
  })
</script>


<template>
  <div class='icon_view_wrap'>
    <child v-model:arr="state.list" />
  </div>
</template>


<style lang='scss' scoped>
.icon_view_wrap{
  color: red;
}
</style>
