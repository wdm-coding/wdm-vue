import fetchRequest from '@/utils/fetchRequest'

export function getEchartsMenus(params?:any | null):any {
  return fetchRequest({
    url: '/api/echarts/types',
    method: 'GET',
    params
  })
}
export function getBarData(params?:any | null):any {
  return fetchRequest({
    url: '/api/echarts/barData',
    method: 'GET',
    params
  })
}