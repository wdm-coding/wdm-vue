<script setup lang="ts">
  import './test.js'
  import child from '@/naive-view/components/child.vue'
  defineOptions({
    name: 'NHome'
  })
  const inputValue = ref<string>()
</script>

<template>
  <n-card class="n_home_wrap">
    <child v-model:value="inputValue" />
    <div style="font-size: 20px;display: flex;flex-direction: column;">
      <cus-icon
        icon="icon-setting-success"
        color="#ff0ff0"
        size="30"
        label="测试"
        label-color="#f6e9d6"
        label-size="16px"
      />
      <cus-icon
        icon="icon-common-eye"
        size="40"
        color="#fff000"
        label="测试"
        label-pos="right"
      />
      <cus-icon
        icon="icon-vue"
        size="20"
        color="#fff000"
        label="测试"
        label-pos="bottom"
      />
      <cus-icon
        icon="icon-vue"
        size="20"
        color="#fff000"
        label="测试"
        label-pos="top"
      />
      <cus-icon
        icon="@/assets/images/logo.jpeg"
        size="20"
        label="图片"
        top="0"
      />
      <cus-icon
        icon="@/assets/images/logo.jpeg"
        size="80"
        label="图片"
        radius="30px"
      />
    </div>
    <n-space>
      <n-button>{{ inputValue }}</n-button>
      <n-button type="tertiary"> Tertiary1 </n-button>
      <n-button type="primary"> Primary </n-button>
      <n-button type="info"> Info </n-button>
      <n-button type="success"> Success </n-button>
      <n-button type="warning"> Warning </n-button>
      <n-button type="error"> Error </n-button>
    </n-space>
  </n-card>
</template>

<style scoped lang="scss">
	.n_home_wrap {
		height: 100vh;
	}
</style>
