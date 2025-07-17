// 封装 Fetch 函数
function fetchRequest(options:any) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
  const {
    url, method = 'GET', data = null, params = null, headers = {}
  } = options
  // 请求拦截器
  let requestUrl = url
  if(method.toUpperCase() === 'GET' && params){
    const queryString = new URLSearchParams(params).toString()
    requestUrl += `?${queryString}`
  }
  const reqParams = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: data ? JSON.stringify(data) : null
  }
  return new Promise((resolve,reject) => {
    fetch( baseUrl + requestUrl, reqParams ).then(response => {
      // 响应拦截器
      const { ok, status } = response
      if(!ok && status !== 200){
        switch (status) {
          case 404:
            window.$message.error('路径不存在')
            break
          default:
            window.$message.error('未知错误')
            break
        }
        return reject(new Error(`HTTP error! status: ${status}`))
      }
      const result = response.json()
      resolve(result)
    }).catch(err => {
      reject(err)
    })
  })
}

export default fetchRequest