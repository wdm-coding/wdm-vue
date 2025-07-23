<script setup lang="ts">
  import BaseBarChart from './bar.vue'
  defineOptions({
    name: 'BarChart'
  })
</script>

<template>
  <a-card class='echarts_home_wrap'>
    <a-row :gutter="[36,36]">
      <a-col
        :xs="2"
        :sm="4"
        :md="6"
        :lg="8"
        :xl="8"
        v-for="(item, index) in 1"
        :key="index"
      >
        <div>
          <BaseBarChart />
        </div>
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
