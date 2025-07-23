import type { MockMethod } from 'vite-plugin-mock'
import { typeList,barData } from './db'
export default [
  {
    url: '/api/echarts/types',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: [...typeList]
      }
    }
  },
  {
    url: '/api/echarts/barData',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: barData
      }
    }
  }
] as MockMethod[]