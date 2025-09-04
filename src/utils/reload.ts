import { transformRoutes,addDynamicRoutes } from '@/custom-ui/Layout/menu/index.ts'
import storage from '@/utils/storges'
import router from '@/router'
const menuData:any[] | null = storage.get('menuData')
if(menuData && menuData.length > 0){
  const dynamicRoutes = transformRoutes(menuData)
  addDynamicRoutes(dynamicRoutes, null, router)
}