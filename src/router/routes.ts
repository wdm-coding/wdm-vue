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
      },
      {
        path: 'n-test',
        name: 'NTest',
        component: () => import('@/naive-view/pages/Test/index.vue')
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
  },
  {
    path: '/echarts',
    redirect: '/echarts/bar-chart',
    name: 'EchartsLayout',
    component: () => import('@/echarts-view/Layout/index.vue'),
    children: [
      {
        path: 'bar-chart',
        name: 'BarChart',
        component: () => import('@/echarts-view/pages/BarChart/index.vue')
      },
      {
        path: 'e-home',
        name: 'EchartsHome',
        component: () => import('@/echarts-view/pages/Home.vue')
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/NotFound/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
]

export default routes