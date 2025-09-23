import type { MenuItem } from './types'
import type {
 Router, RouteRecordNameGeneric, RouteRecordRaw 
} from 'vue-router'
import { getMenuList } from '@/api/webgl'
import storage from '@/utils/storges'
// 将后端菜单数据转换为路由配置
export function transformRoutes(menuData:MenuItem[]):RouteRecordRaw[] {
  return menuData.map(menu => {
    const route:RouteRecordRaw = {
      path: menu.path,
      name: menu.name,
      children: []
    }
    if(menu.meta){
      route.meta = { ...menu.meta }
    }
    if (menu.component) {
      if(menu.component === 'WebglLayout'){
        route.component = () => import('@/webgl/Layout/index.vue')
      } else {
        route.component = () => import(`@/webgl/pages/${menu.component}/index.vue`)
      }
      if(!route.component){
        console.error(`组件路径@/webgl/pages/${menu.component}/index.vue不存在，请检查！`)
      }
    }
    if (menu.children) {
      // 设置route.redirect 为第一个子路由的路径，实现重定向到第一个子路由
      route.redirect = [menu.path,menu.children[0].path].join('/')
      route.children = transformRoutes(menu.children)
    }
    return route
  })
}

// 从后端获取菜单数据并生成动态路由
export function addDynamicRoutes(
  dynamicRoutes:RouteRecordRaw[],
  parentRoute:RouteRecordNameGeneric | string | null = null,
  router:Router
):void {
  // 将动态路由添加到路由实例中
  dynamicRoutes.forEach(route => {
    if(parentRoute){
      // 如果有父路由，则添加到父路由下
      router.addRoute(parentRoute, route)
    }else{
      // 没有父路由，则直接添加到根路由下
      router.addRoute(route)
    }
    // 递归添加子路由
    if (route.children && route.children.length) {
      addDynamicRoutes(route.children, route.name, router)
    }
  })
  // 注意：404页面需要最后添加，所以我们在staticRoutes中已经放到了最后，但动态添加后需要重新设置404
  // 因为动态路由添加后，静态路由的404可能被覆盖，所以重新添加一次
  router.addRoute({
    path: '/:pathMatch(.*)*',
    name: 'NotFoundAll',
    redirect: '/404',
    meta: {
      hidden: true
    }
  })
}

// 初始化动态路由
export async function initDynamicRoutes(router:Router) {
  const { code,data } = await getMenuList()
  if(code === 0){
    if(!data || data.length === 0){
      console.error('菜单数据为空，请检查后端接口！')
      return
    }else{
      storage.set('menuData', data)
      const dynamicRoutes = transformRoutes(data)
      addDynamicRoutes(dynamicRoutes, null, router)
    }
  }else{
    console.error('获取菜单数据失败，请检查后端接口！')
  }
}