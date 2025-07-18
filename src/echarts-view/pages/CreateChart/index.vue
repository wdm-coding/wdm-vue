<script setup lang="ts">
  defineOptions({
    name: 'CreateChart'
  })
  import { chartTypes } from './dict'
  const formState = reactive<any>({
    width: '100%',
    height: '100%',
    chartOptions: {
      backgroundColor: '#fff', // 图表背景色
      title: {
        show: true, // 是否显示标题
        text: '默认标题'
      },
      xAxis: {
        type: 'category',// 横轴类型
        data: [] // 横轴数据
      },
      yAxis: {
        type: 'value'
      },
      series: []
    }
  })
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }
  watchEffect(() => {
    console.log(formState.chartOptions.backgroundColor)
  })
</script>


<template>
  <a-row class='create_chart_wrap'>
    <a-col :span="14">
      <vue-chart
        :options="formState.chartOptions"
        :width="formState.width"
        :height="formState.height"
      />
    </a-col>
    <a-col :span="10">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-collapse>
          <a-collapse-panel key="base" header="基础配置">
            <a-form-item
              label="宽度"
              name="width"
              placeholder="请输入宽度"
            >
              <a-input v-model:value="formState.width" />
            </a-form-item>
            <a-form-item
              label="高度"
              name="height"
              placeholder="请输入高度"
            >
              <a-input v-model:value="formState.height" />
            </a-form-item>
            <a-form-item
              label="图表类型"
              name="chartType"
            >
              <a-select v-model:value="formState.chartOptions.chartType" placeholder="请选择图表类型">
                <a-select-option
                  v-for="item in chartTypes"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="背景色"
              name="backgroundColor"
            >
              <ColorPicker
                v-model="formState.chartOptions.backgroundColor"
                placeholder="请选择背景色"
              />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="title" header="标题配置">
            <a-form-item
              label="text"
              name="text"
            >
              <a-input v-model:value="formState.chartOptions.title.text" />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="X" header="X轴配置">
            <a-form-item
              label="text"
              name="text"
            >
              <a-input v-model:value="formState.chartOptions.title.text" />
            </a-form-item>
          </a-collapse-panel>
          <a-collapse-panel key="Y" header="Y轴配置">
            <a-form-item
              label="text"
              name="text"
            >
              <a-input v-model:value="formState.chartOptions.title.text" />
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </a-col>
  </a-row>
</template>


<style lang='scss' scoped>
.create_chart_wrap{
  width: 100%;
  height: 100%;
}
</style>
