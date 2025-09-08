<script setup lang="ts">
  import XZDropdown from '@/custom-ui/components/XZDropdown/index.vue'
  import XZDropdownTsx from '@/custom-ui/components/XZDropdown/index.tsx'
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
  const dropRef = useTemplateRef<InstanceType<typeof XZDropdown>>('dropRef')
  const selectHandler = (key: string) => {
    console.log(key)
  }
  onMounted(() => {
    dropRef.value?.show()
  })
  defineOptions({
    name: 'DropdownView'
  })
</script>


<template>
  <div class='dropdown_view_wrap'>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">vue组件式</h2>
    <XZDropdown :showArrow="false" :menu-options="menuOptions" style="margin-bottom: 20px;">
      <div>测试</div>
    </XZDropdown>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">vue-tsx</h2>
    <XZDropdownTsx
      :showArrow="false"
      :menu-options="menuOptions"
      ref="dropRef"
      @select="selectHandler"
    >
      <div>测试tsx</div>
    </XZDropdownTsx>
  </div>
</template>


<style lang='scss' scoped>

</style>
