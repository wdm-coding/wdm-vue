import type { Router } from 'vue-router'
import { initDynamicRoutes } from '@/custom-ui/Layout/menu/index.ts'
import storage from '@/utils/storges'
export default function (router: Router) {
  router.beforeEach(async (to, from, next) => {
    const isDynamicRoutesLoaded = storage.get('isDynamicRoutesLoaded')
    if(isDynamicRoutesLoaded){
      next()
    }else{
      await initDynamicRoutes(router)
      storage.set('isDynamicRoutesLoaded', true)
      next({ ...to, replace: true })
    }
  })    
}