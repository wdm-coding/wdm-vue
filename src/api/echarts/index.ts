import fetchRequest from '@/utils/fetchRequest'

export function getEchartsMenus(params:any) {
  return fetchRequest({
    url: '/api/echarts/types',
    method: 'GET',
    params
  })
}