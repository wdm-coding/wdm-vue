import fetchRequest from '@/utils/fetchRequest'

export function getMenuList():any {
  return fetchRequest({
    url: '/api/customUi/menuList',
    method: 'GET'
  })
}