<script setup lang='ts'>
  import XZSwitch from '@/custom-ui/components/XZSwitch/index.vue'
  const checked = ref(true)
  const customValue = ref('wrong')
  defineOptions({
    name: 'SwitchView'
  })
</script>


<template>
  <div class='switch_view_wrap'>
    <div>
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">基础用法</h2>
      <XZSwitch v-model:value="checked" />
    </div>
    <div>
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">禁用Switch</h2>
      <XZSwitch v-model:value="checked" disabled />
    </div>
    <div>
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">自定义变量</h2>
      <XZSwitch v-model:value="customValue" active-value="right" inactive-value="wrong" />
    </div>
    <div>
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">自定义颜色</h2>
      <XZSwitch v-model:value="checked" active-color="#fff000" inactive-color="#f00f00" />
    </div>
    <div>
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">自定义文字</h2>
      <XZSwitch v-model:value="checked" active-text="开" inactive-text="关" />
    </div>
    <div>
      <h2 style="margin: 20px 0;color:var(--xz-color-primary)">自定义大小</h2>
      <div style="display: flex;align-items: center;">
        <span>large: </span>
        <XZSwitch v-model:value="checked" size="large" />
      </div>
      <div style="display: flex;align-items: center;">
        <span>small: </span>
        <XZSwitch v-model:value="checked" size="small" />
      </div>
    </div>
  </div>
</template>


<style lang='scss' scoped>
  .switch_view_wrap{
    padding: 20px;
  }
</style>
