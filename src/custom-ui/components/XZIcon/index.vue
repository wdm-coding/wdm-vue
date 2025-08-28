<script setup lang="ts">
  import './style.scss'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { fas } from '@fortawesome/free-solid-svg-icons'
  import { far } from '@fortawesome/free-regular-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import type { XZIconProps } from './types'
  library.add(fas,far)
  const {
    styleType = 'solid',
    type, 
    icon,
    color,
    fontSize,
    customStyle
  } = defineProps<XZIconProps>()
  const fontSizeComp = computed(() => {
    if(isNaN(Number(fontSize))){
      return fontSize
    }else{
      return fontSize + 'px'
    }
  })
  const filterProps = (target:any) => {
    const result: Record<string, any> = {}
    const wrapperKey = ['type','styleType','color','fontSize','customStyle']
    for(let key in target){
      if(!wrapperKey.includes(key)){
        result[key] = target[key]
      }
    }
    return result
  }
  defineOptions({
    name: 'XzIcon'
  })
</script>


<template>
  <i class='xz-icon' :class="{[`xz-icon--${type}`]:type}" :style="{ fontSize: fontSizeComp,color,...customStyle}">
    <font-awesome-icon v-bind="filterProps($props)" :icon="[`fa-${styleType}`, `fa-${icon}`]" />
  </i>
</template>
