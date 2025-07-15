<script setup lang="ts">
  defineOptions({
    name: 'CusIcon'
  })
  interface IconProps {
    icon: string;
    color?: string;
    size?: string;
    label?: string;
    labelPos?: 'left' | 'right' | 'top' | 'bottom';
    labelColor?: string;
    labelSize?: string;
    space?: string;
    width?: string;
    height?: string;
    radius?: string;
    top?: string;
  }
  const props = withDefaults(defineProps<IconProps>(), {
    icon: '',
    color: '#333',
    size: '1em',
    labelPos: 'left',
    space: '0.1em',
    labelColor: '#333',
    labelSize: '1em'
  })
  // 判断icon是图标名字、图标路径 、ui库图标，分别处理
  const iconType = computed(() => {
    const svg = props.icon.startsWith('icon-')
    const path = props.icon.indexOf('/') !== -1
    const el = props.icon.startsWith('el-')
    const n = props.icon.startsWith('n-')
    const a = props.icon.startsWith('a-')
    const typeMap:any = {
      svg,
      path,
      el,
      n,
      a
    }
    for(let key in typeMap){
      if(typeMap[key]){
        return key
      }
    }
  })
  // svg图标id处理
  const symbolId = computed(() => `#${props.icon}`)
  // 图标标签样式
  const labelStyle = computed(() => {
    if(props.label){
      return {
        color: props.labelColor,
        fontSize: props.labelSize,
        marginLeft: props.labelPos == 'right' ? props.space : 0,
        marginTop: props.labelPos == 'bottom' ? props.space : 0,
        marginRight: props.labelPos == 'left' ? props.space : 0,
        marginBottom: props.labelPos == 'top' ? props.space : 0
      }
    }else{
      return {
        display: 'none'
      }
    }
  })
  // 图片样式
  const imageStyle = computed(() => {
    const style = {
      width: `${props.width || props.size}px`,
      height: `${props.height || props.size}px`,
      borderRadius: props.radius,
      ... props.top ? {
        position: 'relative' as any,
        top: props.top
      } : {}
    }
    return style
  })
  // 图片路径处理
  const imgSrc = computed(() => {
    if(iconType.value === 'path' && props.icon){
      if(props.icon.startsWith('@/assets/images')){
        const path = props.icon.replace('@/assets/images', '/src/assets/images')
        return new URL(path, import.meta.url).href
      }else{
        return props.icon
      }
    }else{
      return ''
    }
  })
</script>

<template>
  <div :class="['cus_icon',`cus_icon_${props.labelPos}`]">
    <template v-if="iconType === 'svg'">
      <svg aria-hidden="true" class="svg_icon" :style="{ width: props.size, height: props.size }">
        <use :xlink:href="symbolId" :fill="props.color" />
      </svg>
    </template> 
    <template v-else-if="iconType === 'path'">
      <img
        :src="imgSrc"
        class="image_icon"
        :style="imageStyle"
      >
    </template>
    <div class="icon_label" :style="labelStyle">{{ props.label }}</div>
  </div>
</template>

<style scoped lang="scss">
  .cus_icon{
    display: inline-flex;
    align-items: center;
    align-self: flex-start;
    &_left{
      flex-direction: row-reverse;
    }
    &_right{
      flex-direction: row;
    }
    &_top{
      flex-direction: column-reverse;
    }
    &_bottom{
      flex-direction: column;
    }
    .svg_icon{
      vertical-align: -0.15em;
      overflow: hidden;
      fill: currentColor;
    }
  }
</style>
