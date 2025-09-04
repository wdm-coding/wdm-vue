<script setup lang="ts">
  import XZTooltip from '@/custom-ui/components/XZTooltip/index.vue'
  import XZButton from '@/custom-ui/components/XZButton/index.vue'
  import type { ModifierArguments, State } from '@popperjs/core/lib/types'
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
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">hover触发</h2>
    <div class="row_item">
      <XZTooltip
        v-model:visible="visible.visible1"
        style="margin-bottom: 20px;"
        :popperOptions="{
          placement: 'bottom',
          modifiers:[
            {
              name: 'offset', options: { offset: [0, 8] },
              enabled: false,
              phase: 'main',
              fn: function (arg0: ModifierArguments<any>): State | void {
                throw new Error('Function not implemented.')
              }
            },
            {
              name: 'preventOverflow', options: { padding: 8 },
              enabled: false,
              phase: 'main',
              fn: function (arg0: ModifierArguments<any>): State | void {
                throw new Error('Function not implemented.')
              }
            },
          ]
        }"
      >
        <div>我是hover触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
      <XZTooltip v-model:visible="visible.visible2" placement="top">
        <div>我是hover触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">click触发</h2>
    <div class="row_item">
      <XZTooltip v-model:visible="visible.visible3" style="margin-bottom: 20px;" trigger="click">
        <div>我是click触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
      <XZTooltip v-model:visible="visible.visible4" placement="top" trigger="click">
        <div>我是click触发器</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">手动触发</h2>
    <div class="row_item">
      <XZTooltip
        v-model:visible="visible.visible5"
        placement="top"
        ref="tooltipRef"
        manual
        style="margin-bottom: 20px;"
      >
        <div>手动触发</div>
        <template #content>
          <div>我是内容</div>
        </template>
      </XZTooltip>
      <XZButton @click="handlerVisible" style="width:200px">我是手动触发器</XZButton>
    </div>
  </div>
</template>


<style lang='scss' scoped>
.tooltip_view_wrap{
  padding: 0 30px;
  .row_item{
    display: flex;
    flex-direction: column;
  }
}
</style>
