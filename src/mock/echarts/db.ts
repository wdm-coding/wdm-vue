export const typeList = [
  {
    id: '1',
    label: '柱状图',
    icon: 'a-BarChartOutlined',
    key: 'bar',
    path: '/echarts/bar-chart'
  },
  {
    id: '2',
    label: '折线图',
    icon: 'a-LineChartOutlined',
    key: 'line'
  },
  {
    id: '3',
    label: '饼图',
    icon: 'a-PieChartOutlined',
    key: 'pie'
  },
  {
    id: '4',
    label: '水球图',
    icon: 'a-DribbbleOutlined',
    key: 'liquid'
  },
  {
    id: '5',
    label: '地图',
    icon: 'a-FundOutlined',
    key: 'map'
  },
  {
    id: '6',
    label: '词云图',
    icon: 'a-CloudOutlined',
    key: 'wordCloud'
  },
  {
    id: '7',
    label: '图表配置',
    icon: 'a-DeploymentUnitOutlined',
    key: 'ChartOptions',
    path: '/echarts/e-home'
  }
]

export const barData = {
  xData: [
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
    '周日'
  ],
  series: [
    {
      name: '销量',
      data: [110, 100, 50, 180, 170, 10, 90]
    },
    {
      name: '库存',
      data: [20, 200, 10, 20, 270, 10, 130]
    },
    {
      name: '访问量',
      data: [50, 300, 50, 80, 370, 110, 100]
    }
  ]
}