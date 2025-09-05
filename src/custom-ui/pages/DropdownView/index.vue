<script setup lang="ts">
  import XZDropdown from '@/custom-ui/components/XZDropdown/index.vue'
  import type { menuOption } from '@/custom-ui/components/XZDropdown/types'
  import { h } from 'vue'
  const menuOptions: menuOption[] = [
    {
      key: '1',
      label: '选项一',
      disabled: true
    },
    {
      key: '2',
      label: h('div', { style: 'color: red;' }, '选项二'),
      divided: true
    }
  ]
  defineOptions({
    name: 'DropdownView'
  })
</script>


<template>
  <div class='dropdown_view_wrap'>
    <XZDropdown :showArrow="false" :menu-options="menuOptions">
      <div>测试</div>
    </XZDropdown>
  </div>
</template>


<style lang='scss' scoped>

</style>
