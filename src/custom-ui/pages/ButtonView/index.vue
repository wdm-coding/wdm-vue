<script setup lang="ts">
  import XZButton from '@/custom-ui/components/XZButton/index.vue'
  defineOptions({
    name: 'ButtonView'
  })
  const buttonRef = useTemplateRef('buttonRef')
  const loading = ref(false)
  onMounted(() => {
    console.log('buttonRef',buttonRef.value, buttonRef.value?.instance)
  })
</script>


<template>
  <div class='button_view_wrap'>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">默认按钮</h2>
    <div style="padding: 20px;display: flex;">
      <XZButton type="default" ref="buttonRef" @click="console.log('default')">默认按钮</XZButton>
      <XZButton type="primary" @click="console.log('primary')">primary</XZButton>
      <XZButton type="success">success</XZButton>
      <XZButton type="warning">warning</XZButton>
      <XZButton type="info">info</XZButton>
      <XZButton type="danger">danger</XZButton>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">朴素按钮</h2>
    <div style="padding: 20px;display: flex;">
      <XZButton type="default" plain ref="buttonRef">朴素按钮</XZButton>
      <XZButton type="primary" plain>primary</XZButton>
      <XZButton type="success" plain>success</XZButton>
      <XZButton type="warning" plain>warning</XZButton>
      <XZButton type="info" plain>info</XZButton>
      <XZButton type="danger" plain>danger</XZButton>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">圆角按钮</h2>
    <div style="padding: 20px;display: flex;">
      <XZButton type="default" round ref="buttonRef">圆角按钮</XZButton>
      <XZButton type="primary" round>primary</XZButton>
      <XZButton type="success" round>success</XZButton>
      <XZButton type="warning" round>warning</XZButton>
      <XZButton type="info" round>info</XZButton>
      <XZButton type="danger" round>danger</XZButton>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">禁用按钮</h2>
    <div style="padding: 20px;display: flex;">
      <XZButton type="default" disabled ref="buttonRef">禁用按钮</XZButton>
      <XZButton type="primary" disabled>primary</XZButton>
      <XZButton type="success" disabled>success</XZButton>
      <XZButton type="warning" disabled>warning</XZButton>
      <XZButton type="info" disabled>info</XZButton>
      <XZButton type="danger" disabled>danger</XZButton>
    </div>
    <div style="padding: 20px;display: flex;">
      <XZButton type="default" disabled ref="buttonRef">禁用按钮</XZButton>
      <XZButton type="primary" disabled>primary</XZButton>
      <XZButton type="success" disabled>success</XZButton>
      <XZButton type="warning" disabled>warning</XZButton>
      <XZButton type="info" disabled>info</XZButton>
      <XZButton type="danger" disabled>danger</XZButton>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">loading按钮</h2>
    <div style="padding: 20px;display: flex;">
      <XZButton type="primary" :loading="loading">primary</XZButton>
      <XZButton type="success" :loading="loading">success</XZButton>
      <XZButton type="warning" :loading="loading">warning</XZButton>
      <XZButton type="info" :loading="loading">info</XZButton>
      <XZButton type="danger" :loading="loading">danger</XZButton>
      <XZButton type="primary" plain @click="loading = !loading">{{loading?'stop':'loading'}}</XZButton>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">ICON按钮</h2>
    <div style="padding: 20px;display: flex;">
      <XZButton type="primary" icon="house">primary</XZButton>
      <XZButton type="success" icon="arrow-down">success</XZButton>
      <XZButton type="warning" icon="arrow-up">warning</XZButton>
      <XZButton type="info" icon="arrow-right">info</XZButton>
      <XZButton type="danger" icon="arrow-left" loading>danger</XZButton>
    </div>
  </div>
</template>


<style lang='scss' scoped>
.button_view_wrap{
  padding: 20px;
}
</style>
