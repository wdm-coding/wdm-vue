<script setup lang="ts">
  defineOptions({
    name: 'EchartsHome'
  })

  const showMessage = () => {
    isShow.value = !isShow.value
  }

  const showModal = () => {}

  const showNotification = () => {
    chartOptions.title!.text = 'ECharts Entry Example----'
  }
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
  const isShow = ref(true)
  const InstanceChart = ref(null)
  watchEffect(() => {
    console.log('Chart Instance:', InstanceChart.value)
  })
</script>


<template>
  <a-card class='echarts_home_wrap'>
    <a-space>
      <a-button type="primary" @click="showMessage">Open message</a-button>
      <a-button type="primary" @click="showModal">Open modal</a-button>
      <a-button type="primary" @click="showNotification">Open notification</a-button>
    </a-space>
    <vue-chart v-model="InstanceChart" :options="chartOptions" v-if="isShow" />
  </a-card>
</template>


<style lang='scss' scoped>
.echarts_home_wrap{
  padding: 20px;
}
</style>
