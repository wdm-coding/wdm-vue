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
      return menuData[0].children.sort((a:any,b:any) => b.id - a.id)
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
  const openLink = (url:string) => {
    window.open(url, '_blank')
  }
  defineOptions({
    name: 'WebglLayout'
  })
</script>


<template>
  <div class='custom_ui_layout_wrap'>
    <div class='custom_ui_header'>
      <div class="title">WEB GL</div>
      <div class="right_icon">
        <img
          src="https://canada1.discourse-cdn.com/flex035/uploads/threejs/original/2X/c/c74c5243388bbfa21a39c3e824ddba702a623dec.png"
          alt="threejs"
          style="height: 30px; margin-right: 10px;cursor: pointer;"
          @click="openLink('https://threejs.org/')"
        >
        <img
          src="http://www.webgl3d.cn/img/logo.png"
          alt="threejs"
          style="height: 30px; margin-right: 10px;cursor: pointer;"
          @click="openLink('http://www.webgl3d.cn/')"
        >
        <XZIcon
          icon="rotate-right"
          @click="reloadPage"
          style="cursor: pointer;"
          size="xl"
          color="#fff"
        />
      </div>
    </div>
    <div class="custom_ui_main">
      <div class="custom_ui_menu">
        <div 
          v-for="menu in menuList" 
          :key="menu.id" 
          :class="['menu_item', activeMenuKey ===  menu.name ? 'active' : '']" 
          @click="menuItemClick(menu)"
        >
          <XZIcon v-if="menu.meta.icon" :icon="menu.meta.icon" style="margin-right: 10px;" />
          <router-link to="">{{ menu.meta.title }}</router-link>
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
    background-color: #a2c5e8;
    display: flex;
    align-items: center;
    position: relative;
    .title{
      font-size: 20px;
      font-weight: bold;
      color: #fff;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
    .right_icon{
      padding: 0 20px;
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }
  .custom_ui_main{
    width: 100vw;
    height: calc(100vh - 60px);
    display: flex;
    .custom_ui_menu{
      width: 240px;
      height: 100%;
      background-color: #f5f5f5;
      overflow: auto;
      padding: 20px 0;
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
