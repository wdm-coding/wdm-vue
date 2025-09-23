import fetchRequest from '@/utils/fetchRequest'

export function getMenuList():any {
  return fetchRequest({
    url: '/api/webgl/menuList',
    method: 'GET'
  })
}

export function getOptions(query:string):any {
  return fetchRequest({
    url: `https://api.github.com/search/repositories?q=${query}`,
    method: 'GET'
  })
}