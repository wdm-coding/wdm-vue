<script setup lang="ts">
  //  Ant Design Vue
  // https://antdv.com/components/overview-cn
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { theme } from 'ant-design-vue'
  import type { ConfigProviderProps } from 'ant-design-vue'
  import { getEchartsMenus } from '@/api/echarts/index'
  import { useAntdMessage } from '@/hooks/useMessage'
  defineOptions({
    name: 'EchartsLayout'
  })
  useAntdMessage()
  const antdConfig:ConfigProviderProps = {
    locale: zhCN,
    theme: {
      algorithm: theme.darkAlgorithm, // 普通模式
      token: {
        colorPrimary: '#00b96b'
      },
      components: {
        Card: {
          borderRadiusLG: 0,
          paddingLG: 0
        },
        Button: {
          borderRadius: 2
        }
      }
    }
  }

  const collapsed = ref(false)
  const selectedKeys = ref(['1'])
  const getEchartsMenusHandler = async () => {
    const res = await getEchartsMenus({
      pageSize: 10,
      pageNum: 1
    })
    console.log(res)
  }
  getEchartsMenusHandler()
</script>


<template>
  <a-config-provider v-bind="antdConfig">
    <a-app>
      <a-layout class="echarts_layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
          <div class="logo" />
          <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline" />
        </a-layout-sider>
        <a-layout>
          <a-layout-header class="header">
            <a-card style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: space-between;">
              <cus-icon
                class="trigger"
                :icon="collapsed?'a-MenuUnfoldOutlined':'a-MenuFoldOutlined'"
                @click="() => (collapsed = !collapsed)"
                size="24px"
                color="#fff"
              />
            </a-card>
          </a-layout-header>
          <a-layout-content>
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-app>
  </a-config-provider>
</template>


<style lang='scss' scoped>
.echarts_layout{
  height: 100%;
  height: 100vh;
  .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
    border-radius: 2px;
  }
  .header{
    display: flex;
    align-items: center;
    padding: 0;
    .trigger{
      padding: 0 24px;
      cursor: pointer;
    }
  }
}
</style>
