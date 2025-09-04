<script setup lang="ts">
  import XZIcon from '@/custom-ui/components/XZIcon/index.vue'
  import Tooltip from '@/custom-ui/components/Tooltip/Tooltip.vue'
  defineOptions({
    name: 'IconView'
  })
</script>


<template>
  <div class='icon_view_wrap'>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">实体图标</h2>
    <XZIcon icon="house" />
    <XZIcon icon="circle-user" />
    <XZIcon icon="image" />
    <XZIcon icon="comment" />
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">空心图标</h2>
    <XZIcon icon="house" styleType="regular" />
    <XZIcon icon="circle-user" styleType="regular" />
    <XZIcon icon="image" styleType="regular" />
    <XZIcon icon="comment" styleType="regular" />
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">图标大小</h2>
    <XZIcon icon="house" styleType="regular" fontSize="14" />
    <XZIcon icon="house" styleType="regular" :fontSize="16" />
    <XZIcon icon="house" styleType="regular" fontSize="18px" />
    <XZIcon icon="house" styleType="regular" fontSize="2vw" />
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">图标颜色</h2>
    <XZIcon icon="house" styleType="regular" type="primary" />
    <XZIcon icon="house" styleType="regular" type="info" />
    <XZIcon icon="house" styleType="regular" type="danger" />
    <XZIcon icon="house" styleType="regular" type="success" />
    <XZIcon icon="house" styleType="regular" type="warning" />
    <XZIcon
      icon="house"
      styleType="regular"
      color="#f0f"
    />
    <XZIcon
      icon="house"
      styleType="regular"
      color="#f00"
    />
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">图标旋转</h2>
    <XZIcon icon="circle-notch" spin color="#666" />
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">图标放大缩小</h2>
    <XZIcon icon="house" styleType="regular" size="1x" />
    <XZIcon icon="house" styleType="regular" size="3x" />
    <XZIcon
      icon="house"
      styleType="regular"
      size="5x"
    />
    <Tooltip>
      <div>666</div>
      <template #content>
        <div>666</div>
      </template> 
    </Tooltip>
  </div>
</template>


<style lang='scss' scoped>
.icon_view_wrap{
  padding: 0 30px;
}
</style>
