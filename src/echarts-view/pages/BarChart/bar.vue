<script setup lang="ts">
  import { getBarData } from '@/api/echarts'
  defineOptions({
    name: 'BaseBarChart'
  })
  const loading = ref(false)
  const chartOptions = reactive({
    backgroundColor: 'transparent',// 背景颜色透明
    grid: {
      show: false, // 是否显示网格
      top: '3%',// 距离容器上侧的距离
      left: '3%', // 距离容器左侧的距离
      right: '4%', // 距离容器右侧的距离
      bottom: '3%', // 距离容器下侧的距离
      containLabel: true // 是否包含坐标轴标签
    },
    xAxis: {
      show: true, // 是否显示坐标轴
      type: 'category', // 坐标轴类型为类目型
      boundaryGap: true, // 坐标轴两边留白策略 true = 留白 false = 不留白
      axisLabel: {
        interval: 0, // 强制显示所有标签 默认是自动间隔显示
        color: '#fff', // 坐标轴标签颜色
        fontSizeCompponent: true, // 坐标轴标签字体大小是否跟随组件大小变化
        formatter: '{value}' // 坐标轴标签格式化器
      },
      axisLine: { // 坐标轴轴线相关设置。
        show: true, // 是否显示坐标轴轴线
        lineStyle: { // 坐标轴轴线的样式设置。
          color: '#fff', // 颜色
          width: '1' // 宽度
        },
        symbol: 'circle', // 坐标轴轴线末端箭头样式
        symbolSize: 10 // 箭头大小
      },
      axisTick: { // 坐标轴刻度相关设置。
        show: true, // 是否显示坐标轴刻度
        alignWithLabel: false, // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐
        interval: 0, // 强制显示所有标签 默认是自动间隔显示
        inside: false, // 刻度是否朝内
        length: 10, // 坐标轴刻度长度
        lineStyle: { // 线条样式设置。
          color: '#fff000', // 颜色
          width: '2' // 宽度
        }
      },
      splitLine: { // 分隔线相关设置
        show: true, // 是否显示分隔线
        lineStyle: { // 线条样式设置。
          color: '#fff', // 颜色
          width: '1', // 宽度
          type: 'dashed' // 线条类型，默认为实线。可选值：'solid', 'dashed', 'dotted'
        }
      },
      data: [] // X轴数据列表
    },
    yAxis: {
      type: 'value', // 坐标轴类型为数值型
      axisLabel: {
        color: '#fff', // 坐标轴标签颜色
        fontSizeCompponent: true, // 坐标轴标签字体大小是否跟随组件大小变化
        formatter: '{value}' // 坐标轴标签格式化器
      },
      axisLine: { // 坐标轴轴线相关设置。
        show: true, // 是否显示坐标轴轴线
        lineStyle: { // 坐标轴轴线的样式设置。
          color: '#fff000', // 颜色
          width: '1' // 宽度
        }
      }
    },
    series: [] // 图表数据列表
  })

  const getData = async () => {
    loading.value = true
    const { code,data } = await getBarData()
    if(code === 0){
      const { xData,series } = data
      chartOptions.xAxis.data = xData
      chartOptions.series = series.map((item:any) => ({ 
        ...item,
        type: 'bar'
        // itemStyle: {
        //   color:
        // }
      }))
    }
    loading.value = false
  }
  onMounted(() => {
    getData()
  })
</script>


<template>
  <vue-chart :options="chartOptions" v-model:loading="loading" />
</template>


<style lang='scss' scoped>

</style>
