import type { MockMethod } from 'vite-plugin-mock'
import { mockMenuData } from './db'
export default [
  {
    url: '/api/webgl/menuList',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [...mockMenuData]
      }
    }
  }
] as MockMethod[]