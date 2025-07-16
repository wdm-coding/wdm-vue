import type { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/login',
    method: 'post',
    statusCode: 200,
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {}
      }
    }
  },
  {
    url: '/api/user',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          name: 'John Doe',
          age: 30
        }
      }
    }
  }
] as MockMethod[]