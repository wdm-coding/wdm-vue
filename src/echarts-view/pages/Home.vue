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
    <a-row :gutter="[26,36]" :justify="'space-around'">
      <a-col
        :xs="2"
        :sm="4"
        :md="6"
        :lg="8"
        :xl="10"
        v-for="(item, index) in 20"
        :key="index"
      >
        <vue-chart :options="chartOptions" width="100%" height="200px" />
      </a-col>
    </a-row>
  </a-card>
</template>


<style lang='scss' scoped>
.echarts_home_wrap{
  width: 100%;
  padding: 20px;
  height: 100%;
}
</style>
