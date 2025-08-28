<script setup lang="ts">
  import '../styles/index.css'
  import { getMenuList } from '@/api/coutom-ui'
  import type { MenuItem } from '@/custom-ui/types'
  defineOptions({
    name: 'CustomUILayout'
  })
  const router = useRouter()
  const route = useRoute()
  const activeMenuKey = ref<string>('')
  watch(() => route.name, newName => {
    activeMenuKey.value = newName as string
  }, { immediate: true })
  const menuList = ref<MenuItem[]>([])
  const getMenuListData = async () => {
    const { code,data } = await getMenuList()
    if(code === 0) {
      menuList.value = data
    }
  }
  const menuItemClick = (menu:MenuItem) => {
    activeMenuKey.value = menu.key
    router.push({ path: menu.path })
  }
  onMounted(() => {
    getMenuListData()
  })
</script>


<template>
  <div class='custom_ui_layout_wrap'>
    <div class='custom_ui_header'>
      自定义组件库
    </div>
    <div class="custom_ui_main">
      <div class="custom_ui_menu">
        <div 
          v-for="menu in menuList" 
          :key="menu.id" 
          :class="['menu_item', activeMenuKey ===  menu.key ? 'active' : '']" 
          @click="menuItemClick(menu)"
        >
          <router-link to="">{{ menu.label }}</router-link>
        </div>
      </div>
      <div class="custom_ui_content">
        <router-view />
      </div>
    </div>
  </div>
</template>


<style lang='scss' scoped>
.custom_ui_layout_wrap{
  width: 100%;
  height: 100%;
  .custom_ui_header{
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    background-color: #a2c5e8;
    color: #fff;
  }
  .custom_ui_main{
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    .custom_ui_menu{
      width: 200px;
      height: 100%;
      background-color: #f5f5f5;
      .menu_item{
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        border-bottom: 1px solid #e0e0e0;
        cursor: pointer;
        a{
          color: inherit;
        }
        &:hover{
          background-color: #e0e0e0;
        }
      }
      .active{
        background-color: #409eff;
        color: #fff;
        &:hover{
          background-color: #409eff;
        }
      }
    }
    .custom_ui_content{
      flex: 1;
      height: 100%;
      background-color: #fff;
      overflow: auto;
    }
  }
}
</style>
