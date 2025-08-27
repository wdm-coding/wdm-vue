<script setup lang="ts">
  const list = [1,2,3,4,5,6]
  const arr = defineModel<any[]>('arr', { default: () => [] })
  const handlerClick = (name:any) => {
    const index = arr.value.indexOf(name)
    if (index > -1) {
      arr.value.splice(index, 1)
    } else {
      arr.value.push(name)
    }
  }
  defineOptions({
    name: 'IconViewChild'
  })
</script>


<template>
  <div class='icon_view_wrap'>
    <div
      v-for="item in list"
      :key="item"
      style="padding: 20px;"
      @click="handlerClick(item)"
    >
      <span>{{ item }}</span>
    </div>
    <div v-for="item in arr" :key="item">value-{{ item }}</div>
  </div>
</template>


<style lang='scss' scoped>
.icon_view_wrap{
  color: red;
}
</style>
