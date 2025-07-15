import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/Home/index.vue')
  },
  {
    path: '/naive',
    redirect: '/naive/n-home',
    name: 'NaiveLayout',
    component: () => import('@/naive-view/Layout/index.vue'),
    children: [
      {
        path: 'n-home',
        name: 'NHome',
        component: () => import('@/naive-view/pages/Home.vue')
      }
    ]
  },
  {
    path: '/element',
    redirect: '/element/e-home',
    name: 'ElementLayout',
    component: () => import('@/element-view/Layout/index.vue'),
    children: [
      {
        path: 'e-home',
        name: 'EHome',
        component: () => import('@/element-view/pages/Home.vue')
      }
    ]
  },
  {
    path: '/antd',
    redirect: '/antd/a-home',
    name: 'AntdLayout',
    component: () => import('@/antd-view/Layout/index.vue'),
    children: [
      {
        path: 'a-home',
        name: 'AHome',
        component: () => import('@/antd-view/pages/Home.vue')
      }
    ]
  }
]

export default routes