<script setup lang="ts">
  defineOptions({
    name: 'BaseBarChart'
  })
  const chartOptions = reactive({
    grid: {
      show: false, // 是否显示网格
      top: '3%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true // 是否包含坐标轴标签
    },
    xAxis: {
      type: 'category', // 坐标轴类型为类目型
      boundaryGap: true, // 坐标轴两边留白策略 true = 留白 false = 不留白
      axisLabel: {
        interval: 0 // 强制显示所有标签 默认是自动间隔显示
      },
      data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: 'Sales',
      type: 'bar',
      data: [4, 20, 36, 10, 10, 20]
    }]
  })
</script>


<template>
  <vue-chart :options="chartOptions" />
</template>


<style lang='scss' scoped>

</style>
