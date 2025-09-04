export const menuList = [
  {
    id: '1',
    label: '按钮组件',
    icon: 'fan',
    path: '/custom-ui/button-view',
    key: 'ButtonView'
  },
  
  {
    id: '2',
    label: '折叠组件',
    icon: 'laptop',
    path: '/custom-ui/collapse-view',
    key: 'CollapseView'
  },
  {
    id: '3',
    label: '图标组件',
    icon: 'face-smile',
    path: '/custom-ui/icon-view',
    key: 'IconView'
  },
  {
    id: '4',
    label: '浮层组件',
    icon: 'laptop-code',
    path: '/custom-ui/tooltip-view',
    key: 'TooltipView'
  }
]

export const mockMenuData = [
  {
    id: 1,
    path: '/custom-ui',
    name: 'CustomUILayout',
    component: 'CustomUILayout',
    children: [
      {
        id: 2,
        path: 'button-view',
        name: 'ButtonView',
        component: 'ButtonView',
        meta: {
          title: '按钮组件',
          icon: 'fan'
        }
      },
      {
        id: 3,
        path: 'icon-view',
        name: 'IconView',
        component: 'IconView',
        meta: {
          title: 'ICON组件',
          icon: 'laptop'
        }
      },
      {
        id: 4,
        path: 'collapse-view',
        name: 'CollapseView',
        component: 'CollapseView',
        meta: {
          title: '折叠',
          icon: 'face-smile'
        }
      },
      {
        id: 5,
        path: 'tooltip-view',
        name: 'TooltipView',
        component: 'TooltipView',
        meta: {
          title: '浮层组件',
          icon: 'laptop-code'
        }
      }
    ]
  }
]