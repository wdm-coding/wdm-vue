<script setup lang="ts">
  import './style.scss'
  import type {
    DropdownInstance,DropdownProps,DropdownEmits, menuOption 
  } from './types'
  import XZTooltip from '../XZTooltip/index.vue'
  import type { TooltipInstance } from '../XZTooltip/types'
  import RenderVnode from '@/custom-ui/utils/RenderVnode'
  const emits = defineEmits<DropdownEmits>()
  const props = withDefaults(defineProps<DropdownProps>(),{
    hideAfterClick: true
  })
  const instance = useTemplateRef<TooltipInstance>('tooltipRef')
  const tooltipProps = computed(() => {
    const result:DropdownProps = { ...props }
    delete result.menuOptions
    delete result.content
    result.placement = 'bottom'
    return result
  })
  const visibleChange = (visible: boolean) => {
    emits('visible-change', visible)
  }
  const itemClick = (item: menuOption) => {
    if (item.disabled) return
    console.log('itemClick', item)
    emits('select', item.key)
    props.hideAfterClick && instance.value?.hide()
  }
  defineExpose<DropdownInstance>({
    show: () => instance.value?.show(),
    hide: () => instance.value?.hide()
  })
  defineOptions({
    name: 'XZDropdown'
  })
</script>


<template>
  <div class='xz-dropdown'>
    <XZTooltip v-bind="tooltipProps" @change="visibleChange" ref="tooltipRef">
      <slot />
      <template #content>
        <div class="xz-dropdown__menu">
          <template v-for="item in props.menuOptions" :key="item.key">
            <div v-if="item.divided" class="xz-dropdown__divided" role="separator" />
            <div class="xz-dropdown__menu-item" @click="itemClick(item)">
              <RenderVnode :v-node="item.label" />
            </div>
          </template>
        </div>
      </template>
    </XZTooltip>
  </div>
</template>


<style lang='scss' scoped>

</style>
