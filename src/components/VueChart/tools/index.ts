import * as echarts from 'echarts'

export const linearColors = () => {
    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: 'red' // 0% 处的颜色
    }, {
        offset: 1,
        color: 'blue' // 100% 处的颜色
    }])
}
export const radialColors = () => {
    return new echarts.graphic.RadialGradient(0, 0, 1, [{
        offset: 0,
        color: 'red' // 0% 处的颜色
    }, {
        offset: 1,
        color: 'blue' // 100% 处的颜色
    }])
}
// {
//   type: 'linear',
//   x: 0,
//   y: 0,
//   x2: 0,
//   y2: 1,
//   colorStops: [{
//       offset: 0, color: 'red' // 0% 处的颜色
//   }, {
//       offset: 1, color: 'blue' // 100% 处的颜色
//   }],
//   global: false // 缺省为 false
// }
// // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
// {
//   type: 'radial',
//   x: 0.5,
//   y: 0.5,
//   r: 0.5,
//   colorStops: [{
//       offset: 0, color: 'red' // 0% 处的颜色
//   }, {
//       offset: 1, color: 'blue' // 100% 处的颜色
//   }],
//   global: false // 缺省为 false
// }













export default echarts