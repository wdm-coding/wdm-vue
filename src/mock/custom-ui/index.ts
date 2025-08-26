import type { MockMethod } from 'vite-plugin-mock'
import { menuList } from './db'
export default [
  {
    url: '/api/customUi/menuList',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [...menuList]
      }
    }
  }
] as MockMethod[]