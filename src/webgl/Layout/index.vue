<script setup lang="ts">
  import '../styles/index.css'
  import type { MenuItem } from './menu/types'
  import storage from '@/utils/storges'
  import XZIcon from '@/custom-ui/components/XZIcon/index.vue'
  const router = useRouter()
  const route = useRoute()
  const activeMenuKey = ref<string>('')
  watch(() => route.name, newName => {
    activeMenuKey.value = newName as string
  }, { immediate: true })
  const menuList = computed(() => {
    const menuData:MenuItem[] = storage.get('menuData') || []
    if(menuData.length > 0 && menuData[0].children && menuData[0].children.length > 0) {
      return menuData[0].children
    }else{
      return []
    }
  })
  const menuItemClick = (menu:MenuItem) => {
    activeMenuKey.value = menu.name
    router.push({ path: menu.path })
  }
  const reloadPage = () => {
    storage.clear()
    storage.set('active-modules', 'webgl')
    location.reload()
  }
  defineOptions({
    name: 'WebglLayout'
  })
</script>


<template>
  <div class='custom_ui_layout_wrap'>
    <div class='custom_ui_header'>
      WEB GL
      <XZIcon icon="rotate-right" @click="reloadPage" style="cursor: pointer;" />
    </div>
    <div class="custom_ui_main">
      <div class="custom_ui_menu">
        <div 
          v-for="menu in menuList" 
          :key="menu.id" 
          :class="['menu_item', activeMenuKey ===  menu.name ? 'active' : '']" 
          @click="menuItemClick(menu)"
        >
          <XZIcon v-if="menu.meta.icon" :icon="menu.meta.icon" style="margin-right: 10px;" /><router-link to="">{{ menu.meta.title }}</router-link>
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
