<script setup lang='ts'>
  import XZSelect from '@/custom-ui/components/XZSelect/index.vue'
  import type { RemoteFunc, SelectOption } from '@/custom-ui/components/XZSelect/types'
  import { getOptions } from '@/api/custom-ui/index.ts'
  const options = ref([
    { value: '1', label: '选项一' },
    { value: '2', label: '选项二' },
    { value: '3', label: '选项三' },
    {
      value: '4', label: '选项四', disabled: true 
    }
  ])
  const selectValue = ref('2')
  setTimeout(() => {
    selectValue.value = '3'
  },1500)
  const renderLabel = (option:any) => {
    return h('span', {
      style: {
        color: 'red'
      }
    }, option.label)
  }
  const filterMethod = (value: string, options: SelectOption[]) => {
    return options.filter(item => item.label.includes(value))
  }
  const handleFetch = (query:string) => {
    if(!query) return Promise.resolve([])
    return getOptions(query).then(({ items }:any) => {
      return items.slice(0,10).map((v:any) => ({ value: v.id, label: v.name }))
    })
  }
  defineOptions({
    name: 'SelectView'
  })
</script>


<template>
  <div class='select_view_wrap'>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">基础选择器</h2>
      <XZSelect v-model:value="selectValue" :options="options" placeholder="请选择选项" />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">可清空选择器</h2>
      <XZSelect
        v-model:value="selectValue"
        :options="options"
        placeholder="请选择选项"
        clearable
      />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">自定义模版</h2>
      <XZSelect
        v-model:value="selectValue"
        :options="options"
        placeholder="请选择选项"
        :renderLabel="renderLabel"
      />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">筛选功能</h2>
      <XZSelect
        v-model:value="selectValue"
        :options="options"
        placeholder="请选择选项"
        filterable
        :filterMethod="filterMethod"
      />
    </div>
    <div style="margin-bottom: 15px;">
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">远程搜索</h2>
      <XZSelect
        v-model:value="selectValue"
        :options="options"
        placeholder="请选择选项"
        remote
        filterable
        :remoteMethod="handleFetch"
      />
    </div>
  </div>
</template>


<style lang='scss' scoped>
  .select_view_wrap{
    padding: 20px;
  }
</style>
