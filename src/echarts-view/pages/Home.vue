<script setup lang="ts">
  defineOptions({
    name: 'EchartsHome'
  })
  const chartOptions = reactive({
    grid: {
      top: '3%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
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
  <a-card class='echarts_home_wrap'>
    <AntdForm />
  </a-card>
</template>


<style lang='scss' scoped>
.echarts_home_wrap{
  width: 100%;
  padding: 20px;
  height: 100%;
}
</style>
