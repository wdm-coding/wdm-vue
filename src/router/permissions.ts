import type { Router } from 'vue-router'
import { initDynamicRoutes as initCustomUiDynamicRoutes } from '@/custom-ui/Layout/menu/index.ts'
import { initDynamicRoutes as initWebglDynamicRoutes } from '@/webgl/Layout/menu/index.ts'
import storage from '@/utils/storges'
const maps = {
  'custom-ui': initCustomUiDynamicRoutes,
  'webgl': initWebglDynamicRoutes
}
const hasMap = {
  'custom-ui': 'CustomUILayout',
  'webgl': 'WebglLayout'
}
export default function (router: Router) {
  router.beforeEach(async (to, from, next) => {
    const modules = storage.get('active-modules') || 'custom-ui'
    if(router.hasRoute('NotFoundAll')){
      router.removeRoute('NotFoundAll')
    }
    const isDynamicRoutesLoaded = storage.get('isDynamicRoutesLoaded')
    if(isDynamicRoutesLoaded && router.hasRoute(hasMap[modules as keyof typeof hasMap])){
      next()
    }else{
      await maps[modules as keyof typeof maps](router)
      storage.set('isDynamicRoutesLoaded', true)
      return to.path === '/404' ? next(to.redirectedFrom!.fullPath) : next(to.path)
    }
  })    
}