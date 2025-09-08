<script setup lang="ts">
  import XZTooltip from '@/custom-ui/components/XZTooltip/index.vue'
  import XZButton from '@/custom-ui/components/XZButton/index.vue'
  const visible:Record<string,boolean> = reactive({})
  const tooltipRef = useTemplateRef<InstanceType<typeof XZTooltip>>('tooltipRef')
  const handlerVisible = () => {
    tooltipRef.value?.toggle()
  }
  defineOptions({
    name: 'TooltipView'
  })
</script>


<template>
  <div class='tooltip_view_wrap'>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">click触发</h2>
    <div style="width: 500px;height: 200px;display: flex;flex-direction: column;justify-content: space-between;border: 1px solid #000;">
      <XZTooltip placement="top" trigger="click">
        <div>我是click触发器--上</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
      <XZTooltip placement="bottom" trigger="click">
        <div>我是click触发器--下</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
      <XZTooltip placement="left" trigger="click">
        <div>我是click触发器--左</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
      <XZTooltip placement="right" trigger="click" :showArrow="false">
        <div>我是click触发器--右</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">hover触发</h2>
    <div style="width: 500px;height: 200px;display: flex;flex-direction: column;justify-content: space-between;border: 1px solid #000;">
      <XZTooltip placement="top">
        <div>我是hover触发器--上</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
      <XZTooltip placement="bottom">
        <div>我是hover触发器--下</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
      <XZTooltip placement="left">
        <div>我是hover触发器--左</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
      <XZTooltip placement="right" :showArrow="false">
        <div>我是hover触发器--右</div>
        <template #content>
          <div>6666666666666666666666666666666666</div>
        </template>
      </XZTooltip>
    </div>
    <h2 style="margin: 20px 0;color:var(--xz-color-primary)">手动触发</h2>
    <div class="row_item">
      <XZTooltip
        v-model:visible="visible.visible6"
        placement="top"
        ref="tooltipRef"
        manual
        style="margin-bottom: 20px;"
      >
        <div>手动触发</div>
        <template #content>
          <div>Lately did you ever feel the pain In the morning rain as it soaks it to the bone</div>
        </template>
      </XZTooltip>
      <XZButton @click="handlerVisible" style="width:200px">我是手动触发器</XZButton>
    </div>
  </div>
</template>


<style lang='scss' scoped>
.tooltip_view_wrap{
  padding: 0 30px;
  height: 120vh;
  .row_item{
    display: flex;
    flex-direction: column;
  }
}
</style>
