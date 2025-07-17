import fetchRequest from '@/utils/fetchRequest'

export function getEchartsMenus(params?:any | null) {
  return fetchRequest({
    url: '/api/echarts/types',
    method: 'GET',
    params
  })
}