<script setup lang="ts">
  import XZTooltip from '@/custom-ui/components/XZTooltip/index.vue'
  const visible:Record<string,boolean> = reactive({})
  const tooltipRef = useTemplateRef<InstanceType<typeof XZTooltip>>('tooltipRef')
  const handlerVisible = () => {
    console.log('我是手动触发器',tooltipRef.value)
    tooltipRef.value?.toggle()
  }
  defineOptions({
    name: 'TooltipView'
  })
</script>


<template>
  <div class='tooltip_view_wrap'>
    <div class="click_handler">
      <XZTooltip v-model:visible="visible.visible1" trigger="click">
        <div>我是hover触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
      <XZTooltip v-model:visible="visible.visible2" placement="bottom" trigger="click">
        <div>我是hover触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
      <XZTooltip v-model:visible="visible.visible3" placement="left" trigger="click">
        <div>我是hover触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
      <XZTooltip v-model:visible="visible.visible4" placement="top" trigger="click">
        <div>我是hover触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
    </div>
    <XZTooltip
      v-model:visible="visible.visible5"
      placement="top"
      ref="tooltipRef"
      manual
    >
      <div>我被手动触发器</div>
      <template #content>
        <div>我是内容</div>
      </template>
    </XZTooltip>
    <div @click="handlerVisible">我是手动触发器</div>
  </div>
</template>


<style lang='scss' scoped>
.tooltip_view_wrap{
  .click_handler{
    display: flex;
    justify-content: space-around;
  }
}
</style>
