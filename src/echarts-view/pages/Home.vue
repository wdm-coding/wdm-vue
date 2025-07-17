<script setup lang="ts">
  defineOptions({
    name: 'EchartsHome'
  })
  const chartOptions = reactive({
    title: {
      text: 'ECharts Entry Example'
    },
    tooltip: {},
    xAxis: {
      data: ['Shirts', 'Cardigans', 'Chiffons', 'Pants', 'Heels', 'Socks']
    },
    yAxis: {},
    series: [{
      name: 'Sales',
      type: 'bar',
      data: [4, 20, 36, 10, 10, 20]
    }]
  })
</script>


<template>
  <a-card class='echarts_home_wrap'>
    <vue-chart :options="chartOptions" width="200px" height="200px" />
    <vue-chart :options="chartOptions" width="200px" height="200px" />
    <vue-chart :options="chartOptions" width="200px" height="200px" />
    <vue-chart :options="chartOptions" width="200px" height="200px" />
  </a-card>
</template>


<style lang='scss' scoped>
.echarts_home_wrap{
  padding: 20px;
  height: 100%;
}
</style>
