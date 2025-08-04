<script setup lang="ts">
  import echarts from './tools/index'
  import { type ECOption } from './types'
  defineOptions({
    name: 'VueChart'
  })
  interface ChartProps {
    width?: string;
    height?: string;
    options: ECOption | any;
    theme?: string | null;
    renderer?: 'canvas' | 'svg';
  }
  const props = withDefaults(defineProps<ChartProps>(), {
    width: '100%',
    height: '400px',
    theme: null,
    renderer: 'svg',
    options: () => ({})
  })
  const chartRef = ref<HTMLElement | null>(null)
  const chartInstance = shallowRef<echarts.ECharts | null>(null)
  const loading = defineModel<boolean>('loading',{ default: false })
  // 初始化图表
  const initChart = () => {
    if (!chartRef.value) return
    // 清理已有实例
    if (chartInstance.value) {
      chartInstance.value.dispose()
    }
    chartInstance.value = echarts.init(chartRef.value,props.theme,{ renderer: props.renderer })
    chartInstance.value.setOption(props.options)
  }
  // 窗口resize 事件处理
  let observer: ResizeObserver | null = null
  const initResizeObserver = () => {
    observer = new ResizeObserver(() => {
      chartInstance.value?.resize()
    })
    if (chartRef.value) {
      observer.observe(chartRef.value)
    }
  }
  // 更新图表
  const updateChart = () => {
    if (chartInstance.value) {
      chartInstance.value.setOption(props.options)
    }else{
      initChart()
    }
  }
  // 双向绑定图表实例
  const insValue = defineModel<echarts.ECharts | null>({
    default: null
  })
  // 监听 chartInstance 的变化 并更新到 instanceValue 中
  watchEffect(() => {
    insValue.value = chartInstance.value
  })
  // 监听配置变化
  watch(() => props.options, updateChart, { deep: true })
  // 监听宽高变化
  watch(() => [props.width, props.height], () => {
    setTimeout(() => chartInstance.value?.resize(), 100)
  })
  // 挂载时初始化图表
  onMounted(() => {
    initChart()
    initResizeObserver()
  })
  // 卸载时清理资源
  onBeforeUnmount(() => {
    if (chartInstance.value) {
      chartInstance.value.dispose()
      chartInstance.value = null
      insValue.value = null
    }
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
</script>


<template>
  <a-spin tip="加载中..." :spinning="loading">
    <div ref="chartRef" :style="{width,height}" />
  </a-spin>
</template>


<style lang='scss' scoped>
::v-deep(.ant-spin-text){
  text-shadow: none !important;
}
</style>
