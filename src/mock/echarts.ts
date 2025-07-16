import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/echarts/menus',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: {
          list: []
        }
      }
    }
  }
] as MockMethod[]