import type { MockMethod } from 'vite-plugin-mock'
import { typeList } from './db'
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
  }
] as MockMethod[]