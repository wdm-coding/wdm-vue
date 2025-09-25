export const mockMenuData = [
  {
    id: 1,
    path: '/webgl',
    name: 'WebglLayout',
    component: 'WebglLayout',
    children: [
      {
        id: 2,
        path: 'first-view',
        name: 'FirstView',
        component: 'FirstView',
        meta: {
          title: '第一个3D场景',
          icon: 'fan'
        }
      },
      {
        id: 3,
        path: 'three-d-view',
        name: 'ThreeDView',
        component: 'ThreeDView',
        meta: {
          title: '认识三维场景',
          icon: 'fan'
        }
      },
      {
        id: 4,
        path: 'lambert-view',
        name: 'LambertView',
        component: 'LambertView',
        meta: {
          title: '受光照影响材质',
          icon: 'fan'
        }
      },
      {
        id: 4,
        path: 'orbit-controls-view',
        name: 'OrbitControlsView',
        component: 'OrbitControlsView',
        meta: {
          title: '相机控件',
          icon: 'fan'
        }
      },
      {
        id: 5,
        path: 'light-view',
        name: 'LightView',
        component: 'LightView',
        meta: {
          title: '平行光与环境光',
          icon: 'fan'
        }
      },
      {
        id: 6,
        path: 'stats-view',
        name: 'StatsView',
        component: 'StatsView',
        meta: {
          title: '性能监视器',
          icon: 'fan'
        }
      },
      {
        id: 7,
        path: 'array-view',
        name: 'ArrayView',
        component: 'ArrayView',
        meta: {
          title: '阵列立方体',
          icon: 'fan'
        }
      },
      {
        id: 8,
        path: 'geometry-view',
        name: 'GeometryView',
        component: 'GeometryView',
        meta: {
          title: '常见几何体',
          icon: 'fan'
        }
      },
      {
        id: 9,
        path: 'mesh-phong-view',
        name: 'MeshPhongView',
        component: 'MeshPhongView',
        meta: {
          title: '高光网格材质',
          icon: 'fan'
        }
      },
      {
        id: 10,
        path: 'gui-view',
        name: 'GuiView',
        component: 'GuiView',
        meta: {
          title: 'Gui可视化界面',
          icon: 'fan'
        }
      }
    ]
  }
]