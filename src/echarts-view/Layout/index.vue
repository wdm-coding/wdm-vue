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
        // colorPrimary: '#00b96b'
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
  const selectedKeys = ref(['bar'])
  const typeList = ref([])
  const CusIcon = resolveComponent('cus-icon')
  const iconRender = (icon: string) => {
    return h(
      CusIcon,
      {
        icon: icon,
        size: '16px',
        color: '#fff'
      }
    )
  }
  const getEchartsMenusHandler = async () => {
    const res = await getEchartsMenus() as { code: number; data: any }
    const { code, data } = res
    if(code === 0){
      typeList.value = data.map((item:any) => ({
        ...item,
        icon: item.icon ? iconRender(item.icon) : ''
      }))
    }
  }
  const openUrl = (url: string) => {
    window.open(url)
  }
  const router = useRouter()
  const menuSelect = ({ item }:any) => {
    const { path } = item
    if(path){
      router.push(path)
    }else{
      router.push('/echarts')
    }
  }
  getEchartsMenusHandler()
</script>


<template>
  <a-config-provider v-bind="antdConfig">
    <a-app>
      <a-layout class="echarts_layout">
        <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
          <div class="logo">图表分类</div>
          <a-menu
            v-model:selectedKeys="selectedKeys"
            theme="dark"
            mode="inline"
            :items="typeList"
            @select="menuSelect"
          />
        </a-layout-sider>
        <a-layout>
          <a-layout-header class="header">
            <cus-icon
              class="trigger"
              :icon="collapsed?'a-MenuUnfoldOutlined':'a-MenuFoldOutlined'"
              @click="() => (collapsed = !collapsed)"
              size="24px"
              color="#fff"
            />
            <div style="margin-left: auto;display: flex;align-items: center;">
              <cus-icon
                class="trigger"
                icon="https://next.antdv.com/assets/logo.1ef800a8.svg"
                @click="openUrl('https://antdv.com/components/overview-cn')"
                size="24px"
                color="#fff"
              />
              <cus-icon
                class="trigger"
                icon="@/assets/images/echarts-logo.png"
                @click="openUrl('https://echarts.apache.org/zh/index.html')"
                size="24px"
                color="#fff"
              />
            </div>
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
    line-height: 32px;
    text-align: center;
  }
  .header{
    display: flex;
    align-items: center;
    padding: 0 20px 0 0;
    .trigger{
      padding: 0 24px;
      cursor: pointer;
    }
  }
}
</style>
